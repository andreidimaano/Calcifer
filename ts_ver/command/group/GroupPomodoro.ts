import { Message } from "discord.js";
import {
  createGroupBreak,
  deleteGroupBreak,
} from "../../database/resolvers/GroupBreakResolver";
import {
  deleteGroupCanceledBreak,
  deleteGroupCanceledPomodoro,
  isCanceledGroup,
  isCanceledGroupBreak,
} from "../../database/resolvers/GroupCanceledResolver";
import {
  createGroup,
  deleteGroup,
} from "../../database/resolvers/GroupPomodoroResolver";
import { endBreakEmbed, startBreakEmbed } from "../pomodoro/BreakEmbed";
import { updateDatabase } from "../pomodoro/Pomodoro";
import { endGroupEmbed, startGroupEmbed } from "./GroupPomodoroEmbed";

export let GroupPomodoro = async (
  message: Message,
  workTime?: number,
  breakTime?: number
) => {
  let authorId = message.author.id;
  let authorTag = message.author.tag;
  let channelId = message.channel.id;
  let voiceChannel = message.member?.voice?.channel;
  let guildId = message.guild?.id;
  let workTimer = workTime && workTime <= 120 && workTime >= 10 ? workTime : 25;
  let errorMessage = groupErrorCheck(workTime);

  //get all current members
  let firstMembers = [...voiceChannel?.members!.values()!];
  let firstUsersToPing: string = "";
  firstMembers?.forEach((member) => {
    if (!member.user.bot) {
      firstUsersToPing = firstUsersToPing.concat(`${member.user.toString()} `);
    }
  });

  await createGroup(authorId, authorTag, guildId!, channelId, workTimer);
  await message.channel.send({
    content: `${firstUsersToPing}, ${errorMessage}`,
    embeds: [startGroupEmbed(workTimer)],
  });

  setTimeout(async () => {
    let canceledGroup = await isCanceledGroup(channelId);
    if (!canceledGroup) {
      deleteGroup(channelId);

      let members = [...voiceChannel?.members?.values()!];
      let usersToPing: string = "";

      members?.forEach((member) => {
        usersToPing = usersToPing.concat(`${member.user.toString()} `);
        updateDatabase(guildId!, member.user.id, member.user.tag, workTimer);
      });

      await message.channel.send({
        content: usersToPing,
        embeds: [endGroupEmbed],
      });

      if (breakTime) {
        await message.channel.send({
          content: usersToPing,
          embeds: [startBreakEmbed(breakTime)],
        });
        await createGroupBreak(channelId, authorId, authorTag);
        setTimeout(async () => {
          let breakCanceled = await isCanceledGroupBreak(channelId);

          let breakMembers = [...voiceChannel?.members?.values()!];
          let usersBreakToPing: string = "";

          breakMembers?.forEach((member) => {
            if (!member.user.bot) {
              usersBreakToPing = usersBreakToPing.concat(
                `${member.user.toString()} `
              );
            }
          });

          if (!breakCanceled) {
            await message.channel.send({
              content: usersBreakToPing,
              embeds: [endBreakEmbed],
            });
            await deleteGroupBreak(channelId);
          } else {
            console.log("Break was canceled");
            await deleteGroupCanceledBreak(channelId);
          }
        }, 60000 * breakTime!);
      }
    } else {
      console.log("Group was canceled");
      await deleteGroupCanceledPomodoro(channelId);
    }
  }, 60000 * workTimer);
};

export let groupErrorCheck = (workTime?: number, breakTime?: number) => {
  let workErrorMessage =
    workTime && (workTime > 120 || workTime < 10)
      ? "```Error: work time specified is not within work time limits, work time set to 25```"
      : "";
  return workErrorMessage;
};
