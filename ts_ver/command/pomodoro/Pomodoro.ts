import { Message } from "discord.js";
import {
  deleteUserCanceledBreak,
  deleteUserCanceledPomodoro,
  isCanceledBreak,
  isCanceledPomodoro,
} from "../../database/resolvers/UserCanceledResolver";
import {
  createUserOnBreak,
  deleteUserOnBreak,
} from "../../database/resolvers/UserOnBreakResolver";
import {
  createUser,
  updateUser,
  userExists,
} from "../../database/resolvers/UserResolver";
import {
  createUserWorking,
  deleteUserWorking,
} from "../../database/resolvers/UserStudyingResolver";
import { DiscordUserData } from "../../types";
import { endBreakEmbed, startBreakEmbed } from "./BreakEmbed";
import { endEmbed, startEmbed } from "./PomodoroEmbed";

export let Pomodoro = async (
  message: Message,
  workTime?: number,
  breakTime?: number
) => {
  let author = message.author.tag;
  let authorId = message.author.id;
  let guildId = message.guild!.id;

  let workTimer = workTime && workTime <= 120 && workTime >= 10 ? workTime : 25;
  let breakTimer =
    breakTime && breakTime <= 30 && breakTime >= 5 ? breakTime : 5;

  let errorMessage = errorCheck(workTime, breakTime);

  createUserWorking(guildId, authorId, author, workTimer);
  await message.reply({
    content: errorMessage,
    embeds: [startEmbed(workTimer)],
  });
  // await message.reply(errorMessage, startEmbed(workTimer));

  setTimeout(async () => {
    let canceledPomodoro = await isCanceledPomodoro(authorId);
    if (!canceledPomodoro) {
      await message.channel.send({
        target: message.author,
        embeds: [endEmbed],
      });

      //remove from study list
      await deleteUserWorking(authorId);
      updateDatabase(guildId, authorId, author, workTimer);

      //start break
      if (breakTime) {
        await message.channel.send({
          target: message.author,
          embeds: [startBreakEmbed(breakTimer)],
        });
        await createUserOnBreak(authorId, author);
        setTimeout(async () => {
          let breakCanceled = await isCanceledBreak(authorId);
          if (!breakCanceled) {
            await message.channel.send({
              target: message.author,
              embeds: [endBreakEmbed],
            });
            await deleteUserOnBreak(authorId);
          } else {
            console.log("Break was canceled");
            await deleteUserCanceledBreak(authorId);
          }
        }, /*60000*/ 1000 * breakTimer!);
      }
    } else {
      console.log("Pomodoro was canceled");
      await deleteUserCanceledPomodoro(authorId);
    }
  }, /*60000*/ 1000 * workTimer);
};

export let errorCheck = (workTime?: number, breakTime?: number) => {
  let breakErrorMessage =
    breakTime && (breakTime > 30 || breakTime < 5)
      ? "```Error: break time is not within break time limits, break time set to 5```"
      : "";
  let workErrorMessage =
    workTime && (workTime > 120 || workTime < 10)
      ? "```Error: work time specified is not within work time limits, work time set to 25```"
      : "";
  return breakErrorMessage === "" && workErrorMessage === ""
    ? null
    : workErrorMessage + breakErrorMessage;
};

export let updateDatabase = async (
  guildId: string,
  discordId: string,
  discordTag: string,
  minutesStudied: number
) => {
  let userData: DiscordUserData = {
    guildId: guildId,
    discordId: discordId,
    discordTag: discordTag,
  };

  let isUser = await userExists(userData);
  if (!isUser) {
    createUser(userData, minutesStudied);
  } else {
    updateUser(userData, minutesStudied);
  }
};
