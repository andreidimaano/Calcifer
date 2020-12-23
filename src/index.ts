import { Client } from 'discord.js'
import firebase from 'firebase';
import { addGuild, isValidGuildQuery } from './database/FirebaseCRUD';
import { onMessage } from './invokers/MessageInvoker';
require('dotenv').config();

const client = new Client();
let guildDatabase: any;
if (firebase.apps.length === 0) {
    firebase.initializeApp({});
}
guildDatabase = firebase.firestore();

client.destroy();
client.login(process.env.DISCORDTOKEN);

client.on('ready', async () => {
    await client.user?.setActivity({
        type: 'PLAYING',
        name: ' | c: help',
    })
    console.log(`Logged in as ${client.user?.tag}!`);
})

client.on('message', async (message) => {
    if(message.author.bot) return;

    //for servers where the bot is already in
    let guildExists = await isValidGuildQuery(guildDatabase, message.guild!.id);
    if (!guildExists) {
        await addGuild(guildDatabase, message.guild!);
    }

    await onMessage(message);
})

client.on('guildCreate', async (guildData) => {
    addGuild(guildDatabase, guildData);
})



