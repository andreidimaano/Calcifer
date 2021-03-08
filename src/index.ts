import { Client } from 'discord.js';
import mongoose from 'mongoose';
import { updateDatabase } from './command/pomodoro/Pomodoro';
import { mongoUrl, userWorking } from './constants';
import { GuildModel } from './database/models/DiscordGuild';
import { UserWorkingModel } from './database/models/UserWorking';
import { deleteAllGroups } from './database/resolvers/GroupPomodoroResolver';
import { createGuild, updateGuild } from './database/resolvers/GuildResolver';
import { deleteAllCanceled } from './database/resolvers/UserCanceledResolver';
import { deleteUsersOnBreak } from './database/resolvers/UserOnBreakResolver';
import { deleteUserWorking } from './database/resolvers/UserStudyingResolver';
import { onMessage } from './invokers/MessageInvoker';
require('dotenv').config();

const client = new Client();
const main = async () => {
    await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    client.login(process.env.TESTTOKEN);

    client.on('ready', async () => {
        await client.user?.setActivity({
            type: 'PLAYING',
            name: ' | c: help',
        })
        console.log(`Logged in as ${client.user?.tag}!`);
        
        await deleteAllGroups();        

        let membersWorking = await UserWorkingModel.find({});
        
        membersWorking.forEach((user) => {
            if((user as userWorking).guildId){
                console.log(user);
                updateDatabase(
                    (user as userWorking).guildId, 
                    (user as userWorking).discordId, 
                    (user as userWorking).discordTag, 
                    (user as userWorking).minutes
                );
                deleteUserWorking((user as userWorking).discordId);
            }
        })
        
        await deleteAllCanceled();
        await deleteUsersOnBreak();
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

    client.on('messageReactionAdd', (messageReaction, user) => {
        // console.log(`Message: ${messageReaction.message.id}`);
        // console.log(`Emoji: ${messageReaction.emoji}`);
        // console.log(user.tag);
    })
}

main();