const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { time } = require("@discordjs/builders");

let data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("All Commands and Helpful Links");

let helpEmbed = new MessageEmbed()
  .setColor("#DE7C5A")
  .setTitle("Commands")
  .setURL("https://github.com/andreidimaano/Calcifer/tree/main/src/commands")
  .setFooter("Contact Andrei Dimaano (aka shaquilleoatmeal)")
  .setTimestamp()
  .addFields(
    {
      name: "NEW: Slash Commands",
      value:
        'type "/" for begin all commands or \n[Click here](https://github.com/andreidimaano/Calcifer/tree/main/src/commands) for a list of message commands or \nuse the buttons below.',
    },
    {
      name: "Message from Calcifer's Creator:",
      value:
        "If this bot has helped you, consider supporting my tuition expenses for my study abroad trip to Yonsei University next February :DD - Don't feel obligated tho, I made this bot for fun :D Zelle: andreiidimaano@gmail.com",
    }
  );

const helpRow = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("pomodoro")
    .setLabel("Start 25 min Pomodoro")
    .setStyle("SECONDARY")
    .setEmoji("🍅"),
  new MessageButton()
    .setCustomId("productivity")
    .setLabel("Productivity")
    .setStyle("SECONDARY")
    .setEmoji("📈"),
  new MessageButton()
    .setCustomId("leaderboard")
    .setLabel("Leaderboards")
    .setStyle("SECONDARY")
    .setEmoji("🏆"),
  new MessageButton()
    .setLabel("Github")
    .setStyle("LINK")
    .setURL("https://github.com/andreidimaano/Calcifer"),
  new MessageButton()
    .setCustomId("cook")
    .setLabel("Click me if you dare")
    .setStyle("DANGER")
    .setEmoji("⚠️")
);

let intExe = async (interaction, options) => {
  await interaction.reply({
    content: `${interaction.user.toString()} Fine, like moving the castle isn\'t hard enough!`,
    embeds: [helpEmbed],
    components: [helpRow],
    ephemeral: false,
  });
};

let mesExe = async (message) => {
  await message.react("😡");
  await message.channel.send({
    content: `${message.author.toString()} Fine, like moving the castle isn\'t hard enough!`,
    embeds: [helpEmbed],
    components: [helpRow],
  });
};

let execute = async (interaction, options) => {
  if (interaction !== null) {
    // console.log(interaction);
    intExe(interaction, options);
  } else {
    mesExe(options.message);
  }
};

module.exports = {
  data,
  execute,
};
