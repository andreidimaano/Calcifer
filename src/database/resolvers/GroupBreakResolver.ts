import { GroupBreakModel } from "../models/GroupBreak";

//create
export let createGroupBreak= async (channelId: string, authorId: string, authorTag: string) => {
    try {
        let newGroupBreak = new GroupBreakModel({
            channelId: channelId,
            authorId: authorId,
            authorTag: authorTag
        });

        await newGroupBreak.save();
    } catch (error) {
        console.log(error);
    }
}

//read
export let isGroupBreak= async (channelId: string) => {
    try {
        return await GroupBreakModel.exists({channelId: channelId});
    } catch (error) {
        console.log(error);
    }
}

//delete
export let deleteGroupBreak = async (channelId: string) => {
    try {
        await GroupBreakModel.deleteOne({channelId: channelId});
    } catch (error) {
        console.log(error);
    }
}

export let deleteGroupsBreak = async () => {
    try {
        await GroupBreakModel.deleteMany({});
    } catch (error) {
        console.log(error);
    }
}
