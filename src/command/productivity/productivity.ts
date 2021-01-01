import { Message } from "discord.js";
import { getUserMinutesStudied, userExists } from "../../database/resolvers/UserResolver";
import { DiscordUserData } from "../../types";

export let Productivity = async (message: Message) : Promise<void> => {
    let userData: DiscordUserData = {
        guildId: message.guild!.id,
        discordId: message.author.id,
        discordTag: message.author.tag,
    }
    let isUser = await userExists(userData);
    if(!isUser){
        await message.reply(productivityMessage('0'));
    } else {
        let minutesStudied = await getUserMinutesStudied(userData);
        let messageConversion = minutesToHours(minutesStudied);
        await message.reply(productivityMessage(messageConversion));
    }
}

let productivityMessage = (minutesStudied: string): string => {
    return `\`\`\`Total Focused Time: ${minutesStudied}\`\`\``;
}

let minutesToHours = (totalMinutes: number): string => {
    let hours = Math.floor(totalMinutes / 60);          
    let minutes = totalMinutes % 60;
    let hourSingularOrPlural = (hours === 1) ? 'hour' : 'hours';

    return (hours === 0) ? `${minutes} minutes`: `${hours} ${hourSingularOrPlural} ${minutes} minutes`;
}