const { MessageActionRow, MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js");

const pomStartEmbed = (duration) => {
  return new MessageEmbed()
    .setTitle("Pomodoro Started")
    .addFields([
      {
        name: `🍅  \`${duration} minutes\``,
        value: "\n:blush: Happy Working!\n",
      },
    ])
    .setColor("GREEN")
    .setTimestamp();
};

const pomStartRow = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("cancelpom")
    .setLabel("Cancel Pomodoro")
    .setStyle("SECONDARY")
    .setEmoji("🚫")
);

const pomEndEmbed = (duration, breakTimeStamp, user) => {
  return new MessageEmbed()
    .setTitle("Finished Pomodoro")
    .setImage(
      "https://media.giphy.com/media/62HBhssMOgdJUZQp1X/giphy.gif?cid=ecf05e476qfh1l789h091lks39a8lbyn4mj6u2bc7sc3u6s9&rid=giphy.gif&ct=g"
    )
    .addFields([
      {
        name: `✅  \`${duration} minutes\``,
        value: `😌 enjoy your *well-deserved* break! ${user.toString()} `,
      },
    ])
    .setColor("GREEN")
    .setTimestamp(breakTimeStamp);
};

const pomEndRow = new MessageActionRow().addComponents(
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
    .setEmoji("🏆")
);

let startBreakEmbed = (duration, timestamp) => {
  return new MessageEmbed()
    .setColor("#cddafd")
    .setTitle("Break Started")
    .addFields({
      name: `:timer: \`${duration} minutes\``,
      value: "Breaks are just as important as working, Rest well!",
    })
    .setTimestamp(timestamp);
};

const startBreakRow = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("cancelpom")
    .setLabel("Cancel Break")
    .setStyle("SECONDARY")
    .setEmoji("🚫"),
  new MessageButton()
    .setLabel("Importance of Breaks")
    .setStyle("LINK")
    .setURL("https://youtu.be/dzjsk5e7srI")
);

let endBreakEmbed = (duration, timestamp, user) => {
  return new MessageEmbed()
    .setColor("#cddafd")
    .setTitle("Break Finished")
    .addFields({
      name: `✅  \`${duration} minutes\``,
      value: `😌 Hope you enjoyed your break! ${user.toString()} `,
    })
    .setTimestamp(timestamp);
};

const endBreakRow = pomEndRow;

module.exports = {
  pomStartEmbed,
  pomStartRow,
  pomEndEmbed,
  pomEndRow,
  startBreakEmbed,
  startBreakRow,
  endBreakEmbed,
  endBreakRow,
};
