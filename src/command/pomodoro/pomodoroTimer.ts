import { Message } from "discord.js";
import { deleteUserCanceledBreak, deleteUserCanceledPomodoro } from "../../database/resolvers/UserCanceledResolver";
import { createUserOnBreak, deleteUserOnBreak, isOnBreak } from "../../database/resolvers/UserOnBreakResolver";
import { createUser, updateUser, userExists } from "../../database/resolvers/UserResolver";
import { createUserWorking, deleteUserWorking, isWorking } from "../../database/resolvers/UserStudyingResolver";
import { DiscordUserData } from "../../types";
import { isCanceledBreak, isCanceledPomodoro } from "../cancel/PomodoroCanceledMembers";
import { endBreakEmbed, startBreakEmbed } from "./BreakEmbed";
import { endEmbed, startEmbed } from "./PomodoroEmbed";

export let PomodoroTimer = async ( message: Message, workTime?: number, breakTime?: number) => {
    let author = message.author.tag;
    let authorId = message.author.id;
    let guildId = message.guild!.id;
    
    let currentlyWorking = await isWorking(authorId);
    if(currentlyWorking) {
        return await message.reply('You\'re already working!');
    }

    let currentlyOnBreak = await isOnBreak(authorId);
    if(currentlyOnBreak) {
        return await message.reply('You\'re on break!');
    }

    let workTimer = (workTime && workTime <= 120 && workTime >= 10) ? workTime : 25;
    let breakTimer = (breakTime && breakTime <= 30 && breakTime >= 5) ? breakTime: 5;
    let breakErrorMessage = (breakTime && (breakTime > 30 || breakTime < 5)) 
        ? '\`\`\`Error: break time is not within break time limits, break time set to 5\`\`\`' 
        : '';
    let workErrorMessage = (workTime && (workTime > 120 || workTime < 10)) ? 
        '\`\`\`Error: work time specified is not within work time limits, work time set to 25\`\`\`' 
        : '';     
    let errorMessage = workErrorMessage + breakErrorMessage;

    createUserWorking(guildId, authorId, author, workTimer);
    await message.reply(errorMessage, startEmbed(workTimer));
    
    setTimeout(async () => {
        let canceledPomodoro = await isCanceledPomodoro(authorId);
        if(!canceledPomodoro) {
            await message.channel.send(message.author, endEmbed);

            //remove from study list
            await deleteUserWorking(authorId);
            updateDatabase(guildId, authorId, author, workTimer);
            
            //start break
            if(breakTime) {
                await message.channel.send(message.author, startBreakEmbed(breakTimer));
                await createUserOnBreak(authorId, author);
                setTimeout(async () => {
                    let breakCanceled = await isCanceledBreak(authorId);
                    if(!breakCanceled){
                        await message.channel.send(message.author, endBreakEmbed);
                        await deleteUserOnBreak(authorId);
                    } else {
                        console.log('Break was canceled');
                        //removeMember(canceledBreakMembers, author);
                        await deleteUserCanceledBreak(authorId);
                    }
                    
                }, 60000 /*1000*/ * breakTimer!);
            }
        } else {
            console.log('Pomodoro was canceled');
            // removeMember(canceledPomodoroMembers, author);
            await deleteUserCanceledPomodoro(authorId);
        }
    }, 60000 /*1000*/ * workTimer); 
}


export let updateDatabase = async (guildId: string, discordId: string, discordTag: string, minutesStudied: number) => {
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




