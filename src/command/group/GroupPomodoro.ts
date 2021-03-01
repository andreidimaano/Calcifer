import { Message } from "discord.js";
import { createGroup, deleteGroup } from "../../database/resolvers/GroupPomodoroResolver";
import { updateDatabase } from "../pomodoro/Pomodoro";
import { startEmbed } from "../pomodoro/PomodoroEmbed";
import { endGroupEmbed } from "./GroupPomodoroEmbed";

export let GroupPomodoro = async (message: Message, workTime?: number) => {
    let authorId = message.author.id;
    let authorTag = message.author.tag;
    let channelId = message.channel.id;
    let voiceChannel = message.member?.voice?.channel ;
    let guildId = message.guild?.id;
    let workTimer = (workTime && workTime <= 120 && workTime >= 10) ? workTime : 25;
    let errorMessage = groupErrorCheck(workTime);

    //get all current members
    let firstMembers = voiceChannel?.members?.array();
    let firstUsersToPing: string = "";
    firstMembers?.forEach(member => {
        firstUsersToPing = firstUsersToPing.concat(`${member.user.toString()} `);
    })

    await createGroup(authorId, authorTag, guildId!, channelId, workTimer,);
    await message.channel.send(`${firstUsersToPing}, ${errorMessage}`, startEmbed(workTimer));

    setTimeout(async () => {
        deleteGroup(message.channel.id);
        
        let members = voiceChannel?.members?.array();
        let usersToPing: string = "";
        
        members?.forEach(member => {
            usersToPing = usersToPing.concat(`${member.user.toString()} `);
            updateDatabase(
                guildId!,
                member.user.id,
                member.user.tag,
                workTimer
            )
        })

        await message.channel.send(usersToPing, endGroupEmbed);

    }, 60000 * workTimer );
    
}

export let groupErrorCheck = (workTime?: number, breakTime?: number) => {
    let workErrorMessage = (workTime && (workTime > 120 || workTime < 10)) ? 
        '\`\`\`Error: work time specified is not within work time limits, work time set to 25\`\`\`' 
        : '';     
    return workErrorMessage;
}