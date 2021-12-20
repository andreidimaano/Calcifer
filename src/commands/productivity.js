const { time, SlashCommandBuilder } = require("@discordjs/builders");
const { formatDuration } = require("../util/minutesToHours");
const {
  getUserMinutesStudied,
  userExists,
} = require("../database/resolvers/UserResolver");

let intExe = async (interaction) => {
  let { user } = interaction;
  await interaction.deferReply({ ephermeral: true });

  let userData = {
    guildId: interaction.guild.id,
    discordId: user.id,
    discordTag: user.tag,
  };

  let isUser = await userExists(userData);
  let minutes = "";

  if (!isUser) {
    minutes = "0 minutes worked";
  } else {
    let minutesStudied = await getUserMinutesStudied(userData);
    minutes = formatDuration(minutesStudied);
  }

  await interaction.editReply({
    target: user,
    embeds: [
      {
        title: "Total Focused Time",
        fields: [
          {
            name: `🍅  \`${minutes}\``,
            value: "\n 👏 keep up the amazing work!",
          },
        ],
        color: "RANDOM",
        timestamp: time(new Date(), "R"),
      },
    ],
    ephermeral: false,
  });
};

let mesExe = async (message) => {
  let { author } = message;
  let userData = {
    guildId: message.guild.id,
    discordId: message.author.id,
    discordTag: message.author.tag,
  };

  let isUser = await userExists(userData);
  let minutes = "";
  if (!isUser) {
    minutes = "0 minutes worked";
  } else {
    let minutesStudied = await getUserMinutesStudied(userData);
    minutes = formatDuration(minutesStudied);
  }

  await message.reply({
    target: author,
    embeds: [
      {
        title: "Total Focused Time",
        fields: [
          {
            name: `🍅  \`${minutes}\``,
            value: "\n 👏 keep up the amazing work!",
          },
        ],
        color: "RANDOM",
        timestamp: time(new Date(), "R"),
      },
    ],
  });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("productivity")
    .setDescription("total minutes worked"),
  async execute(interaction, options) {
    if (interaction !== null) {
      intExe(interaction);
    } else {
      mesExe(options.message);
    }
  },
};
