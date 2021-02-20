import { UserWorkingModel } from '../models/UserWorking'

//create
export let createUserWorking = async (guildId: string, discordId: string, discordTag: string, minutes: number) => {
    try {
        let newUserStudying = new UserWorkingModel({
            discordId: discordId, 
            discordTag: discordTag,
            minutes: minutes,
            guildId: guildId
        });

        await newUserStudying.save();
    } catch (error) {
        console.log(error);
    }
}

//read
export let isWorking = async (discordId: string) => {
    try {
        return await UserWorkingModel.exists({discordId: discordId});
    } catch (error) {
        console.log(error);
    }
}

//delete
export let deleteUserWorking = async (discordId: string) => {
    try {
        await UserWorkingModel.deleteOne({
            discordId: discordId,
        })
    } catch (error) {
        console.log(error);
    }
}
