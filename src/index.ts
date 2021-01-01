import { Client } from 'discord.js';
import mongoose from 'mongoose';
import { mongoUrl } from './constants';
import { getUserTime } from './database/FirebaseCRUD';
import { GuildModel } from './database/models/DiscordGuild';
import { createGuild, updateGuild } from './database/resolvers/GuildResolver';
import { createUser, getUserMinutesStudied } from './database/resolvers/UserResolver';
import { onMessage } from './invokers/MessageInvoker';
require('dotenv').config();
//
const client = new Client();
const main = async () => {
    await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    // await createUser({
    //     guildId:'418524483129704478', 
    //     discordId: '418524483129704478',
    //     discordTag: 'shaquilleoneil#2203',
    //     minutesStudied: 20, 
    // });
    
    let userData = {
        guildId:'418524483129704478', 
        discordId: '418524483129704478',
        discordTag: 'shaquilleoneil#2203',
    }

    let minutes = await getUserMinutesStudied(userData);
    console.log(minutes);

    client.login(process.env.TESTTOKEN);

    client.on('ready', async () => {
        await client.user?.setActivity({
            type: 'PLAYING',
            name: ' | c: help',
        })
        console.log(`Logged in as ${client.user?.tag}!`);
    })
    
    client.on('message', async (message) => {
        if(message.author.bot) return;

        //for servers that already have my bot
        let guildExists = await GuildModel.exists({guildId: message?.guild?.id});
        if(!guildExists) {
            await createGuild(message.guild!);
        }

        await onMessage(message);
    })
    
    client.on('guildCreate', async (guildData) => {
        await createGuild(guildData);
    })

    client.on('guildMemberRemove', async (guildMember) => {
        await updateGuild(guildMember.guild);
    })

    client.on('guildMemberAdd', async (guildMember) => {
        await updateGuild(guildMember.guild);
    })
}

main();