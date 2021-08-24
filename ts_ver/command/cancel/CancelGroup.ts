import { Message } from "discord.js";
import {
  deleteGroupBreak,
  isGroupBreak,
} from "../../database/resolvers/GroupBreakResolver";
import { createGroupCanceled } from "../../database/resolvers/GroupCanceledResolver";
import {
  deleteGroup,
  groupExists,
  isAuthor,
} from "../../database/resolvers/GroupPomodoroResolver";

export let CancelGroup = async (message: Message) => {
  let isAuthorOfGroup = await isAuthor(message.author.id);
  let currentlyWorking = await groupExists(message.channel.id);
  let currentlyOnBreak = await isGroupBreak(message.channel.id);

  if (currentlyWorking) {
    if (isAuthorOfGroup) {
      await deleteGroup(message.channel.id);
      await createGroupCanceled(message.guild!.id, message.channel.id, true);
      await message.reply("Group canceled");
    } else {
      await message.reply("Only the author can cancel a group pomodoro");
    }
  } else if (currentlyOnBreak) {
    await deleteGroupBreak(message.channel.id);
    await createGroupCanceled(message.guild!.id, message.channel.id, false);
    await message.reply("Break Canceled");
  } else if (!currentlyOnBreak && !currentlyWorking) {
    await message.reply("Group Pomodoro does not exist in this channel");
  }
};
