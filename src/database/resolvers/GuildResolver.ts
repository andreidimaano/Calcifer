import { Guild } from "discord.js";
import { Model } from "mongoose";
import mongoose from 'mongoose';
import { UserDoc } from "../../types";
import { GuildModel } from '../models/DiscordGuild';
import { UserSchema } from "../models/User";

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

export let getUserMinutes = async(guildId: string) => {
    try {
        let UserModel: Model<UserDoc> = mongoose.model((guildId + 'users').toLowerCase(), UserSchema);
        let user: Array<UserDoc> = await UserModel.find({});
        user.sort((a, b) => (a.minutesStudied > b.minutesStudied)? -1 : 1);
        user.splice(10, user.length - 10);
        for(let i = 0; i < user.length; i++) {
            console.log(i, user[i]);
        }
        return user;
    } catch (error) {
        console.log(error);
    }
}