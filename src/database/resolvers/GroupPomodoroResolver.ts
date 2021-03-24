import { GroupPomodoroModel } from "../models/GroupPomodoroModel";

//create
export let createGroup = async (authorId: string, authorTag: string, guildId: string, channelId: string, minutes: number) => {
    try {
        let newGroup = new GroupPomodoroModel({
            authorId: authorId,
            authorTag: authorTag,
            guildId: guildId,
            channelId: channelId,
            minutes: minutes
        });

        await newGroup.save();
    } catch (error) {
        console.log(error);
    }
}

//read
export let groupExists = async (channelId: string) => {
    try {
        return await GroupPomodoroModel.exists({channelId: channelId});
    } catch (error) {
        console.log(error);
    }
}

export let isAuthor = async (authorId: string) => {
    try {
        return await GroupPomodoroModel.exists({authorId: authorId});
    } catch (error) {
        console.log(error);
    }
}

export let getAuthor = async (channelId: string) => {
    try {
        return await GroupPomodoroModel.findOne({channelId: channelId}).lean().exec();
    } catch (error) {
        console.log(error);
    }
}

//delete
export let deleteGroup = async (channelId: string) => {
    try {
        await GroupPomodoroModel.deleteMany({
            channelId: channelId
        })
    } catch (error) {
        console.log(error);
    }
}

export let deleteAllGroups = async () => {
    try {
        await GroupPomodoroModel.deleteMany({});
    } catch (error) {
        console.log(error);
    }
}