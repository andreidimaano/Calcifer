import { Message } from "discord.js";
import { createUserCanceled } from "../../database/resolvers/UserCanceledResolver";
import { deleteUserOnBreak, isOnBreak } from "../../database/resolvers/UserOnBreakResolver";
import { deleteUserWorking, isWorking } from "../../database/resolvers/UserStudyingResolver";

export let CancelPomodoro = async (message: Message) : Promise<void> => {
    let currentlyWorking = await isWorking(message.author.id);
    let currentlyOnBreak = await isOnBreak(message.author.id);


    if(currentlyOnBreak) {
        await deleteUserOnBreak(message.author.id);
        // removeMember(currentMembersOnBreak, message.author.tag);
        // canceledBreakMembers.push(message.author.tag);
        await createUserCanceled(message.author.id, message.author.tag, false);
        await message.reply(
            'Break Canceled'
        );
        return;
    } else if(!currentlyWorking && !currentlyOnBreak) {
        await message.reply(
            'You are not currently working and not currently on break! Start a session by typing ```c: pomodoro```'
        );
        return;
    } else if(currentlyWorking){
        await deleteUserWorking(message.author.id);
        // removeMember(currentMembersWorking, message.author.tag);
        // canceledPomodoroMembers.push(message.author.tag);
        await createUserCanceled(message.author.id, message.author.tag, true);
        await message.reply(
            'Pomodoro Canceled'
        );
    }
}