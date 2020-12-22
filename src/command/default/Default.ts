import { Message } from "discord.js";

export let Default = async (message: Message) : Promise<void> => {
    await message.reply('Invalid Command');
}