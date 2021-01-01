import { Guild } from "discord.js";
import { GuildModel } from '../models/DiscordGuild';

//create
export let createGuild = async (guildData: Guild) => {
    try {
        let newGuild = new GuildModel({
            guildId: guildData.id,
            guildName: guildData.toString(),
            guildOwner: guildData.ownerID,
            guildMemberCount: guildData.memberCount
        });
        await newGuild.save();
    } catch (error) {
        console.log(error);
    }
}

//update
export let updateGuild = async (guildData: Guild) => {
    try {
        let query = {guildName: guildData.toString()};
        let operation = {$set: {'guildMemberCount': guildData.memberCount}};
        await GuildModel.findOneAndUpdate(query, operation).exec();
    } catch (error) {
        console.log(error);
    }
}