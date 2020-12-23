import { Message } from "discord.js";
import firebase from "firebase";
import { getUserTime } from "../../database/FirebaseCRUD";

let database = firebase.firestore();

export let Productivity = async (message: Message) : Promise<void> => {
    let minutesStudied = await getUserTime(database, message.guild!.id, message.author.tag);
    if(minutesStudied === -1){
        await message.reply(productivityMessage(minutesStudied.toString()));
    } else {
        minutesToHours(minutesStudied);
        await message.reply(productivityMessage(minutesStudied.toString()));
    }
    
}

let productivityMessage = (minutesStudied: string): string => {
    return `\`\`\`\`Total Focused Time: ${minutesStudied}\`\`\`\``;
}

let minutesToHours = (totalMinutes: number): string => {
    var hours = Math.floor(totalMinutes / 60);          
    var minutes = totalMinutes % 60;

    return (hours === 0) ? `${minutes} minutes`: `${hours} hours ${minutes} minutes`;
}