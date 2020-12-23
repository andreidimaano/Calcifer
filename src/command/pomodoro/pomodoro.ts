import { Message } from "discord.js";
import firebase from "firebase";
import { firebaseApp } from "../../database/FirebaseConfig";
import { addUser, updateDatabase } from "../../database/FirebaseCRUD";
import { endEmbed, startEmbed } from "./PomodoroEmbed";
import { currentlyWorking, currentMembersWorking, removeMemberWorking } from "./PomodoroMembers";

firebaseApp();
let userDatabase = firebase.firestore();

export let Pomodoro = async ( message: Message, time?: number) => {
    let timer = (time && time <= 120 && time >= 10) ? time : 25
    
    //check if currentlyStudying
    if(currentlyWorking(message.author.tag)) {
        return await message.reply('You\'re already working!');
    }
    
    //if not currentlyStudying start Pomodoro
    //(1) update currentMembersStudying
    currentMembersWorking.push(message.author.tag);
    //(2) send confirmation timer
    let errorMessage = (time && (time > 120 || time < 10)) ? 'timer specified is not within time limits, timer set to 25\n' : '';     
    await message.reply(errorMessage, startEmbed(timer));

    setTimeout(async () => {
        await message.channel.send(message.author, endEmbed);
        removeMemberWorking(currentMembersWorking, message.author.tag);
        
        let userDB = await userDatabase.collection('Guild').doc(message.author.tag).get();
        console.log(userDB);
        (userDB) ? await updateDatabase(userDatabase, message.author.tag, userDB, timer) : await addUser(userDatabase, message.author.tag, timer);
    }, /*60000*/ 1000 * timer);
    
}




