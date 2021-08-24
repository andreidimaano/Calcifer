const { time, SlashCommandBuilder } = require("@discordjs/builders");
const { getUserMinutes } = require("../database/resolvers/GuildResolver");
const { formatDuration } = require("../util/minutesToHours");
const {
  userMention,
  memberNicknameMention,
  channelMention,
  roleMention,
} = require("@discordjs/builders");

let formatData = (users) => {
  let rank = "";
  let minutes = "";
  for (let i = 0; i < users.length; i++) {
    let n = (i + 1).toString();
    if (i == 0) {
      n = ":first_place:";
    } else if (i == 1) {
      n = ":second_place:";
    } else if (i == 2) {
      n = ":third_place:";
    }

    const user = userMention(users[i].discordId);

    rank += `${i > 2 ? n + "." : n} ${user} \n`;

    let time = formatDuration(users[i].minutesStudied);
    minutes += `${time} \n`;
  }

  return { rank, minutes };
};

let intExe = async (interaction) => {
  let author = interaction.user;
  await interaction.deferReply();

  let users = await getUserMinutes(interaction.guild.id);
  // let users = await getUserMinutes("590298536713781258");
  let { rank, minutes } = formatData(users);

  await interaction.editReply({
    target: author,
    embeds: [
      {
        title: "All Time Leaderboard",
        fields: [
          { name: "Rankings", value: rank, inline: true },
          { name: "Total Pomodoro Time", value: minutes, inline: true },
        ],
        color: "GOLD",
        timestamp: time(new Date(), "R"),
      },
    ],
  });
};

let mesExe = async (message) => {
  let users = await getUserMinutes(message.guild.id);
  let { rank, minutes } = formatData(users);

  await message.reply({
    target: message.author,
    embeds: [
      {
        title: "All Time Leaderboard",
        fields: [
          { name: "Rankings", value: rank, inline: true },
          { name: "Total Pomodoro Time", value: minutes, inline: true },
        ],
        color: "GOLD",
        timestamp: time(new Date(), "R"),
      },
    ],
  });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Top 10 Minutes Studied/Worked"),
  async execute(interaction, options) {
    if (interaction !== null) {
      intExe(interaction);
    } else {
      mesExe(options.message);
    }
  },
};
