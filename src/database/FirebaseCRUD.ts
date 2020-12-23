import firebase from "firebase";

export let updateDatabase = async (userDatabase: firebase.firestore.Firestore, authorTag: string, userDB: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>, time: Number) => {
    try {
        let minutesStudied = userDB.data()!.minutesStudied;
        await userDatabase.collection('Guild').doc(authorTag).update({
            'minutesStudied': (minutesStudied + time)
        })
    } catch(error) {
        console.log(error);
    }
}

export let addUser = async (userDatabase: firebase.firestore.Firestore, user: string, time: Number) => {
    try {
        await userDatabase.collection('Guild').doc(user).set({
            'minutesStudied': time
        })
    } catch(error) {
        console.log(error);
    }
}

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