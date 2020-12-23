import { Message } from "discord.js";

export let Cook = async (message: Message) : Promise<void> => {
    await message.reply(
        'I don\'t cook! I\'m a scary and powerful fire demon!'
    );
}