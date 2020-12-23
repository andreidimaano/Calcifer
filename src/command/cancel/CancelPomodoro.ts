import { Message } from "discord.js";
import { currentlyWorking, currentMembersWorking, removeMember } from "../pomodoro/PomodoroMembers";
import { canceledPomodoroMembers } from "./PomodoroCanceledMembers";

export let CancelPomodoro = async (message: Message) : Promise<void> => {
    if(!currentlyWorking(message.author.tag)) {
        await message.reply(
            'You are not currently working! Start a session by typing ```c: pomodoro```'
        );
        return;
    } else {
        removeMember(currentMembersWorking, message.author.tag);   
        canceledPomodoroMembers.push(message.author.tag);
    }

    await message.reply(
        'Pomodoro Canceled'
    );
}