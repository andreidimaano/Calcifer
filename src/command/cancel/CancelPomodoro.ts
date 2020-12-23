import { Message } from "discord.js";
import { currentlyWorking, removeMember } from "../pomodoro/PomodoroMembers";
import { canceledPomodoroMembers } from "./PomodoroCanceledMembers";

export let CancelPomodoro = async (message: Message) : Promise<void> => {
    if(!currentlyWorking) {
        await message.reply(
            'You are not currently working! Start a session by typing c: pomodoro'
        );
        return;
    } else {
        removeMember(canceledPomodoroMembers, message.author.tag);   
        canceledPomodoroMembers.push(message.author.tag);
    }

    await message.reply(
        'Pomodoro Canceled'
    );
}