import { Client } from 'discord.js'
import { onMessage } from './eventHandlers'
require('dotenv').config();


const client = new Client();

//login
client.login(process.env.DISCORDTOKEN);

//print message confirming the bot is logged in
client.on('ready', () =>{
    console.log(`Logged in as ${client.user?.tag}!`);
})

client.on('message', async (message) => {
    if(message.author.bot) return;

    if(message.content === 'ping'){
        message.reply('pong')
    }

    if(message.content === 'pee'){
        message.reply('Poop')
    }

    await onMessage(message, client.user!);
})
