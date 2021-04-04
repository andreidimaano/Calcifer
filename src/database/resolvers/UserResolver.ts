import mongoose from 'mongoose';
import { DiscordUserData, UserDoc } from "../../types";
import { UserSchema } from "../models/User";
import {Model} from 'mongoose';

//create
export let createUser = async (userData: DiscordUserData, minutesStudied: number) => {
    try {
        let guildName: string = (userData.guildId + 'users').toLowerCase()
        let User = mongoose.model(guildName, UserSchema);
        let isUser = await userExists(userData);

        if(!isUser) {
            let newUser = new User({
                discordId: userData.discordId,
                discordTag: userData.discordTag,
                minutesStudied: minutesStudied,
            })
            await newUser.save();
        }
        
        console.log('check database');
    } catch (error) {
        console.log(error);
    }
}

//read
export let getUserMinutesStudied = async (userData: DiscordUserData) => {
    try {
        let UserModel = mongoose.model((userData.guildId + 'users').toLowerCase(), UserSchema);
        let user: any = await UserModel.findOne({discordId: userData.discordId}).exec();

        return user.minutesStudied;
    } catch (error) {
        console.log(error);
    }
}

//update
export let updateUser = async (userData: DiscordUserData, minutesStudied: number) => {
    try {
        let User = mongoose.model((userData.guildId + 'users').toLowerCase(), UserSchema);
        let query = {discordId: userData.discordId};
        let operation = {$inc: {'minutesStudied': minutesStudied}};

        await User.findOneAndUpdate(query, operation).exec();
    } catch (error) {
        console.log(error);
    }
}

//helper 
export let userExists = async (userData: DiscordUserData) => {
    try {
        let User = mongoose.model((userData.guildId + 'users').toLowerCase(), UserSchema);
        return await User.exists({discordId: userData.discordId})
    } catch (error) {
        console.log(error);
    }
}