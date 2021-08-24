const { MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { userMention } = require("@discordjs/builders");

const {
  createUserCanceled,
} = require("../database/resolvers/UserCanceledResolver");
const {
  deleteUserOnBreak,
  isOnBreak,
} = require("../database/resolvers/UserOnBreakResolver");
const {
  deleteUserWorking,
  isWorking,
} = require("../database/resolvers/UserWorking");

let data = new SlashCommandBuilder()
  .setName("cancelpom")
  .setDescription("Cancel Pomodoro");
const pom = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("pomodoro")
    .setLabel("Start 25 min Pomodoro")
    .setStyle("SECONDARY")
    .setEmoji("🍅")
);
let intExe = async (interaction) => {
  let { user } = interaction;
  let userMen = userMention(user.id);
  let authorId = user.id;
  let authorTag = user.username + user.discriminator;

  await interaction.deferReply();

  let currentlyWorking = await isWorking(authorId);
  let currentlyOnBreak = await isOnBreak(authorId);

  if (currentlyOnBreak) {
    await deleteUserOnBreak(authorId);
    await createUserCanceled(authorId, authorTag, false);
    await interaction.editReply("Break Canceled");
    return;
  } else if (!currentlyWorking && !currentlyOnBreak) {
    await interaction.editReply({
      content: `${userMen} You are not currently working nor on break.\nStart a session by typing \`c: pomodoro\`, \`/pomodoro\` or use the button below.`,
      components: [pom],
    });
    return;
  } else if (currentlyWorking) {
    await deleteUserWorking(authorId);
    await createUserCanceled(authorId, authorTag, true);
    await interaction.editReply("Pomodoro Canceled");
  }
};

let messExe = async (message) => {
  let currentlyWorking = await isWorking(message.author.id);
  let currentlyOnBreak = await isOnBreak(message.author.id);

  if (currentlyOnBreak) {
    await deleteUserOnBreak(message.author.id);
    await createUserCanceled(message.author.id, message.author.tag, false);
    await message.reply("Break Canceled");
    return;
  } else if (!currentlyWorking && !currentlyOnBreak) {
    await message.reply({
      content:
        "You are not currently working and nor on break! Start a session by typing `c: pomodoro`, `/pomodoro` or use the buttons",
      components: [pom],
    });
    return;
  } else if (currentlyWorking) {
    await deleteUserWorking(message.author.id);
    await createUserCanceled(message.author.id, message.author.tag, true);
    await message.reply("Pomodoro Canceled");
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
