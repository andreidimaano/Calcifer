import { UserCancelBreakModel } from '../models/UserCanceledBreak';
import { UserCancelWorkingModel } from '../models/UserCanceledWorking'

//create
export let createUserCanceled = async (discordId: string, discordTag: string, isStudy: boolean) => {
    try {
        if(isStudy) {
            let newUserCanceledWorking = new UserCancelWorkingModel({
                discordId: discordId, 
                discordTag: discordTag,
            });
    
            await newUserCanceledWorking.save();
        } else {
            let newUserCanceledBreak = new UserCancelBreakModel({
                discordId: discordId, 
                discordTag: discordTag,
            });
    
            await newUserCanceledBreak.save();
        }
    } catch (error) {
        console.log(error);
    }
}


//read
export let isCanceledPomodoro = async (discordId: string) => {
    try {
        return await UserCancelWorkingModel.exists({discordId: discordId});
    } catch (error) {
        console.log(error);
    }
}
export let isCanceledBreak = async (discordId: string) => {
    try {
        return await UserCancelBreakModel.exists({discordId: discordId});
    } catch (error) {
        console.log(error);
    }
}

//delete
export let deleteUserCanceledPomodoro = async (discordId: string) => {
    try {
        await UserCancelWorkingModel.deleteOne({
            discordId: discordId,
        })
    } catch (error) {
        console.log(error);
    }
}

export let deleteUserCanceledBreak = async (discordId: string) => {
    try {
        await UserCancelBreakModel.deleteOne({
            discordId: discordId,
        })
    } catch (error) {
        console.log(error);
    }
}

export let deleteAllCanceled = async () => {
    try {
        await UserCancelBreakModel.deleteMany({});
        await UserCancelWorkingModel.deleteMany({});
    } catch (error) {
        console.log(error);
    }
}
