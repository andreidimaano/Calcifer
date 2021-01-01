import { Message } from "discord.js";
import { createUser, updateUser, userExists } from "../../database/resolvers/UserResolver";
import { DiscordUserData } from "../../types";
import { canceledPomodoroMembers, isCanceledPomodoro } from "../cancel/PomodoroCanceledMembers";
import { endEmbed, startEmbed } from "./PomodoroEmbed";
import { currentlyWorking, currentMembersWorking, removeMember } from "./PomodoroMembers";

export let Pomodoro = async ( message: Message, time?: number) => {
    let timer = (time && time <= 120 && time >= 10) ? time : 25
    let author = message.author.tag;
    let authorId = message.author.id;
    let guildId = message.guild!.id;
    
    if(currentlyWorking(author)) {
        return await message.reply('You\'re already working!');
    }
    
    currentMembersWorking.push(author);
    let errorMessage = (time && (time > 120 || time < 10)) ? 'timer specified is not within time limits, timer set to 25\n' : '';     
    await message.reply(errorMessage, startEmbed(timer));

    setTimeout(async () => {
        if(!isCanceledPomodoro(author)) {
            await message.channel.send(message.author, endEmbed);
            removeMember(currentMembersWorking, author);
            updateDatabase(guildId, authorId, author, timer);
        } else {
            removeMember(canceledPomodoroMembers, author);
        }
    }, 60000 * timer);   
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




