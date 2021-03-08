import { Message } from "discord.js";
import { createGroupCanceled, deleteGroupCanceledPomodoro } from "../../database/resolvers/GroupCanceledResolver";
import { getAuthor, groupExists, isAuthor } from "../../database/resolvers/GroupPomodoroResolver";

export let CancelGroup = async (message: Message) => {
    let isAuthorOfGroup = await isAuthor(message.author.id);

    if(isAuthorOfGroup){
        await deleteGroupCanceledPomodoro(message.channel.id)
        await createGroupCanceled(message.guild!.id, message.channel.id, true);

        await message.reply(
            'Group canceled'
        );
    } else {
        await message.reply(
            'Only the author can cancel a group pomodoro'
        );
    }
}