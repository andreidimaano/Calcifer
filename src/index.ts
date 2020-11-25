import { Client, Message} from 'discord.js'
require('dotenv').config();


const client = new Client();

//login
client.login(process.env.DISCORDTOKEN);

//print message confirming the bot is logged in
client.on('ready', () =>{
    console.log(`Logged in as ${client.user?.tag}!`);
})

client.on('message', message => {
    if(message.author.bot) return;

    if(message.content === 'ping'){
        message.reply('pong')
    }

    if(message.content === 'pee'){
        message.reply('Poop')
    }
})
