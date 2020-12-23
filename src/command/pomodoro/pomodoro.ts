import { Message } from "discord.js";
import firebase from "firebase";
import { initializeFirebase } from "../../database/FirebaseConfig";
import { addUser, updateUserTotalTime } from "../../database/FirebaseCRUD";
import { canceledPomodoroMembers, isCanceledPomodoro } from "../cancel/PomodoroCanceledMembers";
import { endEmbed, startEmbed } from "./PomodoroEmbed";
import { currentlyWorking, currentMembersWorking, removeMember} from "./PomodoroMembers";

initializeFirebase();
let userDatabase = firebase.firestore();

export let Pomodoro = async ( message: Message, time?: number) => {
    let timer = (time && time <= 120 && time >= 10) ? time : 25
    let author = message.author.tag;
    
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
            updateDatabase(author, timer);
        } else {
            removeMember(canceledPomodoroMembers, author);
        }
    }, /*60000*/ 1000 * timer);   
}

let updateDatabase = async (author: string, timer: Number) => {
    //if user exists in DB, execute Update operation; execute Add operation otherwise.
    let userDB = await userDatabase.collection('Guild').doc(author).get();
    (userDB) ? await updateUserTotalTime(userDatabase, author, userDB, timer) : await addUser(userDatabase, author, timer);
}




