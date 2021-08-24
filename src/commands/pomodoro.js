const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");

const {
  parseInteractionOptions,
  parseMessageOptions,
} = require("../util/parseOptions");
const {
  deleteUserCanceledBreak,
  deleteUserCanceledPomodoro,
  isCanceledBreak,
  isCanceledPomodoro,
} = require("../database/resolvers/UserCanceledResolver");
const {
  createUserOnBreak,
  deleteUserOnBreak,
} = require("../database/resolvers/UserOnBreakResolver");
const {
  createUserWorking,
  deleteUserWorking,
  isWorking,
} = require("../database/resolvers/UserWorking");
const { isOnBreak } = require("../database/resolvers/UserOnBreakResolver");
const { updateDatabase } = require("../util/updateDatabase");
const {
  pomStartEmbed,
  pomStartRow,
  pomEndEmbed,
  pomEndRow,
  startBreakEmbed,
  startBreakRow,
  endBreakEmbed,
  endBreakRow,
} = require("../embeds/PomEmbed");

let intExe = async (interaction, options) => {
  let { user, member, guildId } = interaction;
  if (options === undefined) {
    options = parseInteractionOptions(interaction.options._hoistedOptions);
  }
  let { work, rest } = options;

  let authorId = user.id;
  let author = user.username + user.discriminator;

  let currentlyWorking = await isWorking(authorId);
  if (currentlyWorking) {
    await interaction.editReply("```Error: You're already working!```");
    return;
  }

  let currentlyOnBreak = await isOnBreak(authorId);
  if (currentlyOnBreak) {
    await interaction.editReply("```Error: You're on break!```");
    return;
  }

  let breakTimeStamp = moment().add(work, "m").toDate();
  let endbreakTimeStamp = moment(breakTimeStamp).add(rest, "m").toDate();

  // start pomodoro
  createUserWorking(guildId, authorId, author, work);
  await interaction.reply({
    target: user,
    content: `${user.toString()} ${options.error.pom}${options.error.rest}`,
    embeds: [pomStartEmbed(work)],
    components: [pomStartRow],
  });

  // goes above
  let channel = await interaction.member.guild.channels.fetch(
    interaction.channelId
  );

  let canceledPomodoro = await isCanceledPomodoro(authorId);
  if (canceledPomodoro) {
    console.log("Pomodoro was canceled");
    await deleteUserCanceledPomodoro(authorId);
  }

  // pomodoro
  setTimeout(async () => {
    // end pom
    let canceledPomodoro = await isCanceledPomodoro(authorId);
    if (canceledPomodoro) {
      console.log("Pomodoro was canceled");
      await deleteUserCanceledPomodoro(authorId);
    } else {
      await channel.send({
        target: user,
        content: `${user.toString()}`,
        embeds: [pomEndEmbed(work, breakTimeStamp, user)],
        components: [pomEndRow],
      });
      await deleteUserWorking(authorId);
      updateDatabase(guildId, authorId, author, work);

      if (rest) {
        await channel.send({
          target: user,
          content: `${user.toString()}`,
          embeds: [startBreakEmbed(rest, breakTimeStamp)],
          components: [startBreakRow],
        });

        await createUserOnBreak(authorId, author);
        setTimeout(async () => {
          let breakCanceled = await isCanceledBreak(authorId);
          if (breakCanceled) {
            console.log("Break was canceled");
            await deleteUserCanceledBreak(authorId);
          } else {
            await channel.send({
              target: user,
              content: `${user.toString()}`,
              embeds: [endBreakEmbed(rest, endbreakTimeStamp, user)],
              components: [endBreakRow],
            });
            await deleteUserOnBreak(authorId);
          }
        }, rest * 60000);
      }
    }
  }, work * 60000);
};

let mesExe = async (options) => {
  let { message } = options;
  let user = message.author;
  let authorId = user.id;
  let { guildId, channel } = message;
  let author = user.username + user.discriminator;
  let { work, rest, error } = parseMessageOptions(options.work, options.rest);

  let breakTimeStamp = moment().add(work, "m").toDate();
  let endbreakTimeStamp = moment(breakTimeStamp).add(rest, "m").toDate();

  createUserWorking(guildId, authorId, author, work);
  await message.reply({
    target: user,
    content: `${user.toString()} ${error.pom}${error.rest}`,
    embeds: [pomStartEmbed(work)],
    components: [pomStartRow],
  });

  let canceledPomodoro = await isCanceledPomodoro(authorId);
  if (canceledPomodoro) {
    console.log("Pomodoro was canceled");
    await deleteUserCanceledPomodoro(authorId);
  }

  setTimeout(async () => {
    // end pom
    let canceledPomodoro = await isCanceledPomodoro(authorId);
    if (canceledPomodoro) {
      console.log("Pomodoro was canceled");
      await deleteUserCanceledPomodoro(authorId);
    } else {
      await channel.send({
        target: user,
        content: `${user.toString()}`,
        embeds: [pomEndEmbed(work, breakTimeStamp, user)],
        components: [pomEndRow],
      });
      await deleteUserWorking(authorId);
      updateDatabase(guildId, authorId, author, work);

      if (rest) {
        await channel.send({
          target: user,
          content: `${user.toString()}`,
          embeds: [startBreakEmbed(rest, breakTimeStamp)],
          components: [startBreakRow],
        });

        await createUserOnBreak(authorId, author);
        setTimeout(async () => {
          let breakCanceled = await isCanceledBreak(authorId);
          if (breakCanceled) {
            console.log("Break was canceled");
            await deleteUserCanceledBreak(authorId);
          } else {
            await channel.send({
              target: user,
              content: `${user.toString()}`,
              embeds: [endBreakEmbed(rest, endbreakTimeStamp, user)],
              components: [endBreakRow],
            });
            await deleteUserOnBreak(authorId);
          }
        }, rest * 60000);
      }
    }
  }, work * 60000);
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pomodoro")
    .setDescription("Starts a pomodoro")
    .addIntegerOption((option) =>
      option
        .setName("work")
        .setDescription("the time in minutes you want to work")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("break")
        .setDescription("the time in minutes you want to rest")
        .setRequired(false)
    ),
  execute: async (interaction, options) => {
    if (interaction !== null) {
      intExe(interaction, options);
    } else {
      mesExe(options);
    }
  },
};
