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

    client.login(process.env.DISCORDTOKEN);

    client.on('ready', async () => {
        await client.user?.setActivity({
            type: 'PLAYING',
            name: ' | c: help',
        })
        console.log(`Logged in as ${client.user?.tag}!`);
        
        if(!(client.user?.tag === "SpongeBob#9136")){
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
        }
    })
    
    client.on('message', async (message) => {
        try {
            if(message.author.bot) return;
            await onMessage(message);
        } catch (error) {
            console.log(error);
        }
    })
    
    client.on('guildCreate', async (guildData) => {
        try {
            let guildExists = await GuildModel.exists({guildId: guildData.id});
            if(!guildExists) {
                await createGuild(guildData);
            }
        } catch (error) {
            console.log(error);
        }
    })

    client.on('guildMemberRemove', async (guildMember) => {
        await updateGuild(guildMember.guild);
    })

    client.on('guildMemberAdd', async (guildMember) => {
        await updateGuild(guildMember.guild);
    })
}

main();