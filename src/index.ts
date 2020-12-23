import { Client } from 'discord.js'
import firebase from 'firebase';
import { initializeFirebase } from './database/FirebaseConfig';
import { addGuild } from './database/FirebaseCRUD';
import { onMessage } from './invoker/MessagInvoker';
require('dotenv').config();

const client = new Client();
let guildDatabase: any;

let main = async () => {
    client.login(process.env.TESTTOKEN);
    //client.login(process.env.DISCORDTOKEN);
    if (firebase.apps.length === 0) {
        firebase.initializeApp({});
    }
    guildDatabase = firebase.firestore();
}

main();

client.on('ready', async () => {
    await client.user?.setActivity({
        type: 'PLAYING',
        name: ' | c: help',
    })
    console.log(`Logged in as ${client.user?.tag}!`);
})

client.on('message', async (message) => {
    if(message.author.bot) return;

    await onMessage(message);
})

client.on('guildCreate', async (guildData) => {
    addGuild(guildDatabase, guildData);
})


