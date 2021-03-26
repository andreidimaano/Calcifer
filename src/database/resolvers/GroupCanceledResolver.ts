import { GroupCancelBreakModel } from '../models/GroupCancelBreak';
import { GroupCancelWorkingModel } from '../models/GroupCanceledWorking';

//create
export let createGroupCanceled = async (guildId: string, channelId: string, isWork: boolean) => {
    try {
        if(isWork) {
            let newGroupCanceledWorking = new GroupCancelWorkingModel({
                guildId: guildId,
                channelId: channelId
            });
    
            await newGroupCanceledWorking.save();
        } else {
            let newGroupCanceledBreak = new GroupCancelBreakModel({
                guildId: guildId,
                channelId: channelId
            });
    
            await newGroupCanceledBreak.save();
        }
    } catch (error) {
        console.log(error);
    }
}

//read
export let isCanceledGroup = async (channelId: string) => {
    try {
        return await GroupCancelWorkingModel.exists({channelId: channelId});
    } catch (error) {
        console.log(error);
    }
}

export let isCanceledGroupBreak = async (channelId: string) => {
    try {
        return await GroupCancelBreakModel.exists({channelId: channelId});
    } catch (error) {
        console.log(error);
    }
}

//delete
export let deleteGroupCanceledPomodoro = async (channelId: string) => {
    try {
        await GroupCancelWorkingModel.deleteOne({
            channelId: channelId
        })
    } catch (error) {
        console.log(error);
    }
}

export let deleteGroupCanceledBreak = async (channelId: string) => {
    try {
        await GroupCancelBreakModel.deleteOne({
            channelId: channelId
        })
    } catch (error) {
        console.log(error);
    }
}

export let deleteAllCanceledGroup = async () => {
    try {
        await GroupCancelWorkingModel.deleteMany({});
        await GroupCancelBreakModel.deleteMany({});
    } catch (error) {
        console.log(error);
    }
}
