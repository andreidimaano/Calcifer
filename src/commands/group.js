const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const moment = require("moment");

const { isGroupBreak } = require("../database/resolvers/GroupBreakResolver");
const { groupExists } = require("../database/resolvers/GroupPomodoroResolver");
const {
  deleteGroupCanceledBreak,
  deleteGroupCanceledPomodoro,
  isCanceledGroup,
  isCanceledGroupBreak,
} = require("../database/resolvers/GroupCanceledResolver");
const {
  createGroupBreak,
  deleteGroupBreak,
} = require("../database/resolvers/GroupBreakResolver");
const {
  parseInteractionOptions,
  parseMessageOptions,
} = require("../util/parseOptions");
const {
  createGroup,
  deleteGroup,
} = require("../database/resolvers/GroupPomodoroResolver");
const {
  groupStartEmbed,
  groupStartRow,
  groupEndEmbed,
  groupEndRow,
  startGroupBreakEmbed,
  startGroupBreakRow,
  endGroupBreakEmbed,
  endGroupBreakRow,
} = require("../embeds/GroupEmbed");
const { updateDatabase } = require("../util/updateDatabase");

const player = createAudioPlayer();

function playSong() {
  const resource = createAudioResource("./src/util/YoScott.m4a", {
    inputType: StreamType.Arbitrary,
  });

  player.play(resource);

  return entersState(player, AudioPlayerStatus.Playing, 5e3);
}

async function connectToChannel(channel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
    return connection;
  } catch (error) {
    connection.destroy();
    throw error;
  }
}

let data = new SlashCommandBuilder()
  .setName("group")
  .setDescription("Work with your friends :D")
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
  );

let intExe = async (interaction, options) => {
  if (options === undefined) {
    options = parseInteractionOptions(interaction.options._hoistedOptions);
  }
  let { work, rest, error } = options;
  let { user, member, guildId, channelId } = interaction;
  let { id, username, discriminator } = user;
  let authorId = id;
  let authorTag = username + discriminator;
  let { voice } = member;
  let { channel } = voice;
  let textChannel = await interaction.member.guild.channels.fetch(
    interaction.channelId
  );

  console.log("voice: "); console.log(voice);
  console.log("voice channel: "); console.log(voice.channel);

  await interaction.deferReply();

  // checks if you can start a group pomodoro
  let groupPomInProgress = await groupExists(channelId);
  let groupBreakInProgress = await isGroupBreak(channelId);

  if (groupPomInProgress) {
    await interaction.editReply("```Error: Group Pomdoro in Progress```");
    return;
  } else if (groupBreakInProgress) {
    await interaction.editReply("```Error: Group Break in Progress```");
    return;
  }

  if (channel === undefined || channel === null) {
    await interaction.editReply(
      "```Error: You are not connected to a voice channel```"
    );
    return;
  } else if (!channel.name.includes("group")) {
    await interaction.editReply(
      "```Error: You are not connected to a group pomodoro voice channel```"
    );
    return;
  } else if (
    interaction.channel.type === "GUILD_TEXT" &&
    !interaction.channel.name.includes("group")
  ) {
    await interaction.editReply(
      "```Error: You can only start a group pomodoro in the group text channel```"
    );
    return;
  }

  let breakTimeStamp = moment().add(work, "m").toDate();
  let endbreakTimeStamp = moment(breakTimeStamp).add(rest, "m").toDate();

  let firstMembers = [...channel.members.values()];
  let firstUsersToPing = "";
  firstMembers?.forEach((member) => {
    if (!member.user.bot) {
      firstUsersToPing = firstUsersToPing.concat(`${member.user.toString()} `);
    }
  });

  let canceledGroup = await isCanceledGroup(channelId);
  if (canceledGroup) await deleteGroupCanceledPomodoro(channelId);
  await createGroup(authorId, authorTag, guildId, channelId, work);

  await interaction.editReply({
    target: user,
    content: `${firstUsersToPing} ${error.pom}${error.rest}`,
    embeds: [groupStartEmbed(work)],
    components: [groupStartRow],
    ephemeral: false
  });

  setTimeout(async () => {
    let canceledGroup = await isCanceledGroup(channelId);
    if (canceledGroup) {
      console.log("Group was canceled");
      await deleteGroupCanceledPomodoro(channelId);
    } else {
      await deleteGroup(channelId);

      let members = [...channel.members.values()];
      let usersToPing = "";

      members.forEach((member) => {
        if (!member.user.bot) {
          usersToPing = usersToPing.concat(`${member.user.toString()} `);
          let memberTag = member.user.username + member.user.discriminator;
          updateDatabase(guildId, member.user.id, memberTag, work);
        }
      });

      await textChannel.send({
        target: user,
        content: usersToPing,
        embeds: [groupEndEmbed(work, breakTimeStamp)],
        components: [groupEndRow],
      });

      // YO
      if (voice.channelId) {
        let vc = voice.channel;
        try {
          await playSong();
          const connection = await connectToChannel(vc);
          connection.subscribe(player);
          setTimeout(() => connection.destroy(), 4_000);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("voice could not play")
      }

      if (rest) {
        await textChannel.send({
          content: usersToPing,
          embeds: [startGroupBreakEmbed(rest, breakTimeStamp)],
          components: [startGroupBreakRow],
        });
        await createGroupBreak(channelId, authorId, authorTag);

        setTimeout(async () => {
          let breakCanceled = await isCanceledGroupBreak(channelId);

          let members = [...channel.members.values()];
          let usersToPing = "";

          members.forEach((member) => {
            if (!member.user.bot) {
              usersToPing = usersToPing.concat(`${member.user.toString()} `);
            }
          });

          if (!breakCanceled) {
            await textChannel.send({
              content: usersToPing,
              embeds: [endGroupBreakEmbed(rest, endbreakTimeStamp)],
              components: [endGroupBreakRow],
            });
            await deleteGroupBreak(channelId);
          } else {
            console.log("Break was canceled");
            await deleteGroupCanceledBreak(channelId);
          }
        }, rest * 60000);
      }
    }
  }, work * 60000);
};

let mesExe = async (options) => {
  let { message } = options;
  let { work, rest, error } = parseMessageOptions(options.work, options.rest);
  let user = message.author;
  let { member, guildId, channelId } = message;
  let { id, username, discriminator } = user;
  let authorId = id;
  let authorTag = username + discriminator;
  let { voice } = member;
  let { channel } = voice;

  let breakTimeStamp = moment().add(work, "m").toDate();
  let endbreakTimeStamp = moment(breakTimeStamp).add(rest, "m").toDate();

  let firstMembers = [...channel.members.values()];
  let firstUsersToPing = "";
  firstMembers?.forEach((member) => {
    if (!member.user.bot) {
      firstUsersToPing = firstUsersToPing.concat(`${member.user.toString()} `);
    }
  });

  let canceledGroup = await isCanceledGroup(channelId);
  if (canceledGroup) await deleteGroupCanceledPomodoro(channelId);
  await createGroup(authorId, authorTag, guildId, channelId, work);

  await message.reply({
    target: user,
    content: `${firstUsersToPing} ${error.pom}${error.rest}`,
    embeds: [groupStartEmbed(work)],
    components: [groupStartRow],
  });

  setTimeout(async () => {
    let canceledGroup = await isCanceledGroup(channelId);
    if (canceledGroup) {
      console.log("Group was canceled");
      await deleteGroupCanceledPomodoro(channelId);
    } else {
      await deleteGroup(channelId);

      let members = [...channel.members.values()];
      let usersToPing = "";

      members.forEach((member) => {
        if (!member.user.bot) {
          usersToPing = usersToPing.concat(`${member.user.toString()} `);
          let memberTag = member.user.username + member.user.discriminator;
          updateDatabase(guildId, member.user.id, memberTag, work);
        }
      });

      await message.channel.send({
        target: user,
        content: usersToPing,
        embeds: [groupEndEmbed(work, breakTimeStamp)],
        components: [groupEndRow],
      });

      // YO
      if (voice.channelId) {
        let vc = voice.channel;
        try {
          await playSong();
          const connection = await connectToChannel(vc);
          connection.subscribe(player);
          setTimeout(() => connection.destroy(), 4_000);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("voice could not play")
      }

      if (rest) {
        await message.channel.send({
          content: usersToPing,
          embeds: [startGroupBreakEmbed(rest, breakTimeStamp)],
          components: [startGroupBreakRow],
        });
        await createGroupBreak(channelId, authorId, authorTag);

        setTimeout(async () => {
          let breakCanceled = await isCanceledGroupBreak(channelId);

          let members = [...channel.members.values()];
          let usersToPing = "";

          members.forEach((member) => {
            if (!member.user.bot) {
              usersToPing = usersToPing.concat(`${member.user.toString()} `);
            }
          });

          if (!breakCanceled) {
            await message.channel.send({
              content: usersToPing,
              embeds: [endGroupBreakEmbed(rest, endbreakTimeStamp)],
              components: [endGroupBreakRow],
            });
            await deleteGroupBreak(channelId);
          } else {
            console.log("Break was canceled");
            await deleteGroupCanceledBreak(channelId);
          }
        }, rest * 60000);
      }
    }
  }, work * 60000);
};

let execute = (interaction, options) => {
  if (interaction !== null) {
    intExe(interaction, options);
  } else {
    mesExe(options);
  }
};

module.exports = {
  data,
  execute,
};
