import { UserBreakModel } from "../models/UserOnBreak";

//create
export let createUserOnBreak = async (discordId: string, discordTag: string) => {
    try {
        let newUserOnBreak = new UserBreakModel({
            discordId: discordId, 
            discordTag: discordTag,
        });

        await newUserOnBreak.save();
    } catch (error) {
        console.log(error);
    }
}

//read
export let isOnBreak= async (discordId: string) => {
    try {
        return await UserBreakModel.exists({discordId: discordId});
    } catch (error) {
        console.log(error);
    }
}

//delete
export let deleteUserOnBreak = async (discordId: string) => {
    try {
        await UserBreakModel.deleteOne({
            discordId: discordId,
        })
    } catch (error) {
        console.log(error);
    }
}
