const { MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { userMention } = require("@discordjs/builders");

const {
  deleteGroupBreak,
  isGroupBreak,
} = require("../database/resolvers/GroupBreakResolver");
const {
  createGroupCanceled,
} = require("../database/resolvers/GroupCanceledResolver");
const {
  deleteGroup,
  groupExists,
  isAuthor,
} = require("../database/resolvers/GroupPomodoroResolver");

let data = new SlashCommandBuilder()
  .setName("cancelgroup")
  .setDescription("Cancel Group Pomodoro");

const group = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("group")
    .setLabel("Start 25 min Group Pomodoro")
    .setStyle("SECONDARY")
    .setEmoji("🧑‍🤝‍🧑")
);

let intExe = async (interaction) => {
  let { user, channelId, guildId } = interaction;
  let authorId = user.id;

  await interaction.deferReply();

  let isAuthorOfGroup = await isAuthor(authorId);
  let currentlyWorking = await groupExists(channelId);
  let currentlyOnBreak = await isGroupBreak(channelId);

  if (currentlyWorking) {
    if (isAuthorOfGroup) {
      await deleteGroup(channelId);
      await createGroupCanceled(guildId, channelId, true);
      await interaction.editReply("Group canceled");
    } else {
      await interaction.editReply(
        "Only the author can cancel a group pomodoro"
      );
    }
  } else if (currentlyOnBreak) {
    await deleteGroupBreak(channel.Id);
    await createGroupCanceled(guildId, channelId, true);
    await interaction.editReply("Break Canceled");
  } else if (!currentlyOnBreak && !currentlyWorking) {
    await interaction.editReply({
      content: "Group Pomodoro does not exist in this channel",
      components: [group],
    });
  }
};

let messExe = async (message) => {
  let isAuthorOfGroup = await isAuthor(message.author.id);
  let currentlyWorking = await groupExists(message.channel.id);
  let currentlyOnBreak = await isGroupBreak(message.channel.id);

  if (currentlyWorking) {
    if (isAuthorOfGroup) {
      await deleteGroup(message.channel.id);
      await createGroupCanceled(message.guild.id, message.channel.id, true);
      await message.reply("Group canceled");
    } else {
      await message.reply("Only the author can cancel a group pomodoro");
    }
  } else if (currentlyOnBreak) {
    await deleteGroupBreak(message.channel.id);
    await createGroupCanceled(message.guild.id, message.channel.id, false);
    await message.reply("Break Canceled");
  } else if (!currentlyOnBreak && !currentlyWorking) {
    await message.reply({
      content: "Group Pomodoro does not exist in this channel",
      components: [group],
    });
  }
};

let execute = async (interaction, options) => {
  if (interaction !== null) {
    intExe(interaction);
  } else {
    messExe(options.message);
  }
};

module.exports = {
  data,
  execute,
};
