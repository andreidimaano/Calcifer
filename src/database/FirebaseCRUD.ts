import { Guild, Snowflake } from "discord.js";
import firebase from "firebase";

/* User CRUD */
//Create
export let addUser = async (database: firebase.firestore.Firestore, guildId: string, authorTag: string, time: Number) => {
    try {
        await database.collection('Guilds').doc(guildId).collection('Users').doc(authorTag).set({
            'minutesStudied': time
        })
    } catch(error) {
        console.log(error);
    }
}

//Read
export let getUserTime = async (database: firebase.firestore.Firestore, guildId: string, authorTag: string): Promise<number> => {
    try {
        let user = await database.collection('Guilds').doc(guildId).collection('Users').doc(authorTag).get();
        if(user.exists){
            return user.data()!.minutesStudied;
        }
    } catch(error) {
        console.log(error);
    }

    return -1;
}

//Update
export let updateUserTotalTime = async (database: firebase.firestore.Firestore, guildId: string, authorTag: string, userDB: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>, time: Number) => {
    try {
        let minutesStudied = userDB.data()!.minutesStudied;
        await database.collection('Guilds').doc(guildId).collection('Users').doc(authorTag).update({
            'minutesStudied': (minutesStudied + time)
        })
    } catch(error) {
        console.log(error);
    }
}



/* GUILD CRUD */

//Create
export let addGuild = async (database: firebase.firestore.Firestore, guildData: Guild) => {
    try {
        await database.collection('Guilds').doc(guildData.id).set({
            'guildName': guildData.toString(),
            'guildOwner': guildData.ownerID,
            'guildMemberCount': guildData.memberCount,
        });
        //await addUser(database, guildData.id, guildData.owner!.user.tag, 0);
    } catch(error) {
        console.log(error);
    }
}

//Read
export let isValidGuildQuery = async (database: firebase.firestore.Firestore, guildId: string): Promise<Boolean> => {
    let guild = await database.collection('Guilds').doc(guildId).get();
    return (guild.exists);
}
