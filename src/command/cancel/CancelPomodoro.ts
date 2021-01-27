import { Message } from "discord.js";
import { removeMember } from "../pomodoro/ArrayFunctions";
import { currentlyOnBreak, currentMembersOnBreak } from "../pomodoro/BreakMembers";
import { currentlyWorking, currentMembersWorking } from "../pomodoro/PomodoroMembers";
import { canceledPomodoroMembers } from "./PomodoroCanceledMembers";

export let CancelPomodoro = async (message: Message) : Promise<void> => {
    if(currentlyOnBreak(message.author.tag)) {
        removeMember(currentMembersOnBreak, message.author.tag);
        await message.reply(
            'Break Canceled'
        );
        return;
    } else if(!currentlyWorking(message.author.tag) && !currentlyOnBreak(message.author.tag)) {
        await message.reply(
            'You are not currently working and not currently on break! Start a session by typing ```c: pomodoro```'
        );
        return;
    } else if(currentlyWorking(message.author.tag)){
        removeMember(currentMembersWorking, message.author.tag);   
        canceledPomodoroMembers.push(message.author.tag);
        await message.reply(
            'Pomodoro Canceled'
        );
    }
}