import { Message } from "discord.js";

export let CancelPomodoro = async (message: Message) : Promise<void> => {
    
    await message.reply(
        'Pomodoro Canceled'
    );
}