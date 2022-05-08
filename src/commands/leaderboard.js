const { time, SlashCommandBuilder } = require("@discordjs/builders");
const { getUserMinutes } = require("../database/resolvers/GuildResolver");
const { formatDuration } = require("../util/minutesToHours");
const {
  userMention,
  memberNicknameMention,
  channelMention,
  roleMention,
} = require("@discordjs/builders");
const {readLeaderboard} = require('../database');

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
    const userTag = users[i].discordTag.slice(0, users[i].discordTag.length - 5)

    rank += `${i > 2 ? n + "." : n} ${user} (${userTag})\n`;

    let time = formatDuration(users[i].minutesStudied);
    minutes += `${time} \n`;
  }

  return { rank, minutes };
};

let intExe = async (interaction, supabase) => {
  let author = interaction.user;
  await interaction.deferReply();

  let users = await readLeaderboard(supabase, interaction.guild.id)
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
    ephemeral: false,
  });
};

let mesExe = async (message, supabase) => {
  let users = await readLeaderboard(supabase, message.guild.id)
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
  async execute(interaction, options, supabase) {
    if (interaction !== null) {
      intExe(interaction, supabase);
    } else {
      mesExe(options.message, supabase);
    }
  },
};
