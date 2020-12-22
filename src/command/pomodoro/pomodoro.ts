import { Message } from "discord.js";
import { endEmbed, startEmbed } from "./PomodoroEmbed";
import { currentlyStudying, currentMembersStudying, removeMember } from "./PomodoroMembers";

export let Pomodoro = async ( message: Message, time?: number) => {
    let timer = (time && time <= 50 && time >= 10) ? time : 25
    
    //check if currentlyStudying
    if(currentlyStudying(message.author.tag)) {
        return await message.reply('You\'re already studying!');
    }
    
    //if not currentlyStudying start Pomodoro
    //(1) update currentMembersStudying
    currentMembersStudying.push(message.author.tag);
    //(2) send confirmation timer
    let errorMessage = (time && (time > 50 || time < 10)) ? 'timer specified is not within time limits, timer set to 25\n' : '';     
    await message.reply(errorMessage ,startEmbed(timer));

    setTimeout(async () => {
        await message.channel.send(message.author, endEmbed);
        removeMember(currentMembersStudying, message.author.tag);
    }, /*60000*/ 1000 * timer);
}



