import { Message } from "discord.js";
import firebase from "firebase";
import { getUserTime } from "../../database/FirebaseCRUD";

let database = firebase.firestore();

export let Productivity = async (message: Message) : Promise<void> => {
    let minutesStudied = await getUserTime(database, message.guild!.id, message.author.tag);
    if(minutesStudied === -1){
        await message.reply(productivityMessage(minutesStudied.toString()));
    } else {
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