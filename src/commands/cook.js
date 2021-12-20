const { SlashCommandBuilder } = require("@discordjs/builders");
const { time } = require("@discordjs/builders");

let intExe = async (interaction) => {
  await interaction.reply({
    target: interaction.user,
    embeds: [
      {
        title: "I DON'T COOK! I'm a scary and powerful fire demon!",
        image: {
          url: "https://media.giphy.com/media/BQoLRe6DL7q5a/giphy.gif?cid=ecf05e47sevx2xbuvoqxh5b0ycexsuktl3hky5p5ucbd6vwo&rid=giphy.gif&ct=g",
        },
        color: "BLACK",
        timestamp: time(new Date(), "R"),
      },
    ],
    ephemeral: false,
  });
};

let mesExe = async (message) => {
  await message.reply({
    target: message.author,
    embeds: [
      {
        title: "I DON'T COOK! I'm a scary and powerful fire demon!",
        image: {
          url: "https://media.giphy.com/media/BQoLRe6DL7q5a/giphy.gif?cid=ecf05e47sevx2xbuvoqxh5b0ycexsuktl3hky5p5ucbd6vwo&rid=giphy.gif&ct=g",
        },
        color: "BLACK",
        timestamp: time(new Date(), "R"),
      },
    ],
  });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cook")
    .setDescription("only if u dare :O"),
  async execute(interaction, options) {
    if (interaction !== null) {
      intExe(interaction);
    } else {
      mesExe(options.message);
    }
  },
};
