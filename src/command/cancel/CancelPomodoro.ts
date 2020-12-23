import { Message } from "discord.js";
import { currentlyWorking } from "../pomodoro/PomodoroMembers";

export let CancelPomodoro = async (message: Message) : Promise<void> => {
    if(!currentlyWorking) {
        await message.reply(
            'You are not currently working! Start a session by typing c: pomodoro'
        )
    }
    await message.reply(
        'Pomodoro Canceled'
    );
}