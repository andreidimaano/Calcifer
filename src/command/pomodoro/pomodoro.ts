import { Message } from "discord.js";
import { createUser, updateUser, userExists } from "../../database/resolvers/UserResolver";
import { DiscordUserData } from "../../types";
import { canceledPomodoroMembers, isCanceledPomodoro } from "../cancel/PomodoroCanceledMembers";
import { printArray, removeMember } from "./ArrayFunctions";
import { currentlyOnBreak, currentMembersOnBreak } from "./BreakMembers";
import { endEmbed, startEmbed } from "./PomodoroEmbed";
import { currentlyWorking, currentMembersWorking } from "./PomodoroMembers";

export let Pomodoro = async ( message: Message, workTime?: number, breakTime?: number) => {
    let author = message.author.tag;
    let authorId = message.author.id;
    let guildId = message.guild!.id;
    
    if(currentlyWorking(author)) {
        return await message.reply('You\'re already working!');
    }

    if(currentlyOnBreak(author)) {
        return await message.reply('You\'re on break!');
    }
    
    currentMembersWorking.push(author);

    let workTimer = (workTime && workTime <= 120 && workTime >= 10) ? workTime : 25;
    let breakTimer = (breakTime && breakTime <= 30 && breakTime >= 5) ? breakTime: 5;
    let breakErrorMessage = (breakTime && (breakTime > 30 || breakTime < 5)) 
        ? '\`\`\`Error: break time is not within break time limits, break time set to 5\`\`\`' 
        : '';
    let workErrorMessage = (workTime && (workTime > 120 || workTime < 10)) ? 
        '\`\`\`Error: work time specified is not within work time limits, work time set to 25\`\`\`' 
        : '';     
    let errorMessage = workErrorMessage + breakErrorMessage;

    await message.reply(errorMessage, startEmbed(workTimer));
    setTimeout(async () => {
        if(!isCanceledPomodoro(author)) {
            await message.channel.send(message.author, endEmbed);

            //remove from study list
            removeMember(currentMembersWorking, author);
            updateDatabase(guildId, authorId, author, workTimer);
            
            //add break
            if(breakTime) {
                currentMembersOnBreak.push(author);
                console.log('before: ');
                printArray(currentMembersOnBreak);
                setTimeout(async () => {
                    removeMember(currentMembersOnBreak, author);
                    console.log('after: ')
                    printArray(currentMembersOnBreak);
                }, /*60000*/ 1000 * breakTimer!);
            }
        } else {
            removeMember(canceledPomodoroMembers, author);
        }
    }, /*60000*/ 1000 * workTimer); 
}


let updateDatabase = async (guildId: string, discordId: string, discordTag: string, minutesStudied: number) => {
    let userData: DiscordUserData = {
        guildId: guildId,
        discordId: discordId,
        discordTag: discordTag,
    }
    
    let isUser = await userExists(userData);
    if(!isUser){
        createUser(userData, minutesStudied)
    } else {
        updateUser(userData, minutesStudied);
    }
}




