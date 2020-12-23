import { Guild, Snowflake } from "discord.js";
import firebase from "firebase";

export let updateUserTotalTime = async (database: firebase.firestore.Firestore, guildId: string, authorTag: string, userDB: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>, time: Number) => {
    console.log('update is called');
    try {
        let minutesStudied = userDB.data()!.minutesStudied;
        await database.collection('Guilds').doc(guildId).collection('Users').doc(authorTag).update({
            'minutesStudied': (minutesStudied + time)
        })
    } catch(error) {
        console.log(error);
    }
}

export let addUser = async (database: firebase.firestore.Firestore, guildId: string, authorTag: string, time: Number) => {
    try {
        await database.collection('Guilds').doc(guildId).collection('Users').doc(authorTag).set({
            'minutesStudied': time
        })
    } catch(error) {
        console.log(error);
    }
}

export let addGuild = async (database: firebase.firestore.Firestore, guildData: Guild) => {
    try {
        console.log('add guild called')
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

export let isValidGuildQuery = async (database: firebase.firestore.Firestore, guildId: string): Promise<Boolean> => {
    console.log('fuunction called');
    let guild = await database.collection('Guilds').doc(guildId).get();
    console.log(guild.exists);
    return (guild.exists);
}

// export let isValidUserQuery = async (database: firebase.firestore.Firestore, guildId: string, author: string): Promise<Boolean> => {
//     let user = await database.collection('Guild').doc(guildId).collection('Users').doc(author).get();
//     return (user) ? true: false;
// }

/*
Guilds(Servers) -> Guild -> Users -> User -> minutesStudied
userDatabase.collection('Guilds').doc(guildid).collection(Users).doc(message.author.tag).update({})
userDarabase.collection('Guilds').doc('GuildId').set({ 
    'guildName: '
    'guildOwner: '
    'guildMemberCount: '
})

message: guildId
cross reference the guild Id with the DB
let guild = userDarabase.collection('Guilds').doc('GuildId').get()

if !guild create guild 
add user
if guild update guild
update user

bot.on(guildCreate, () => {
    create Guild
})

createGuild {
    userDarabase.collection('Guilds').doc('GuildId').set({ 
        'guildName: '
        'guildOwner: '
        'guildMemberCount: '
    })
}

updateGuild {
    updateUser
}

updateUser {
    already created
}
*/