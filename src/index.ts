import { Client } from 'discord.js'
import { onMessage } from './eventHandlers'
require('dotenv').config();

const client = new Client();

//login
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

    await onMessage(message, client.user!);
})
