const { MessageActionRow, MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js");

const groupStartEmbed = (duration) => {
  return new MessageEmbed()
    .setTitle("Group Pomodoro Started")
    .addFields([
      {
        name: `🧑‍🤝‍🧑 \`${duration} minutes\``,
        value: ":blush: Happy Working!",
      },
    ])
    .setColor("#570000")
    .setTimestamp();
};

const groupStartRow = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("cancelgroup")
    .setLabel("Cancel Group Pomodoro")
    .setStyle("SECONDARY")
    .setEmoji("🚫")
);

const groupEndEmbed = (duration, breakTimeStamp) => {
  return new MessageEmbed()
    .setTitle("Finished Pomodoro")
    .setImage(
      "https://media.giphy.com/media/IzU4wcD554uGc/giphy.gif?cid=ecf05e474j8l5fkzkq7pyzb6d6tz02mk7shoihs8oae24j05&rid=giphy.gif&ct=g"
    )
    .addFields([
      {
        name: `✅  \`${duration} minutes\``,
        value: `😌 amazing job titans! enjoy your *well-deserved* breaks.`,
      },
    ])
    .setColor("#570000")
    .setTimestamp(breakTimeStamp);
};

const groupEndRow = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("group")
    .setLabel("Start 25 min Group Pomodoro")
    .setStyle("SECONDARY")
    .setEmoji("🧑‍🤝‍🧑"),
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

let startGroupBreakEmbed = (duration, timestamp) => {
  return new MessageEmbed()
    .setColor("#cddafd")
    .setTitle("Break Started")
    .addFields({
      name: `:timer: \`${duration} minutes\``,
      value: "Breaks are just as important as working, Rest well!",
    })
    .setTimestamp(timestamp);
};

let startGroupBreakRow = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("cancelgroup")
    .setLabel("Cancel Group Break")
    .setStyle("SECONDARY")
    .setEmoji("🚫"),
  new MessageButton()
    .setLabel("Importance of Breaks")
    .setStyle("LINK")
    .setURL("https://youtu.be/dzjsk5e7srI")
);

let endGroupBreakEmbed = (duration, timestamp) => {
  return new MessageEmbed()
    .setColor("#cddafd")
    .setTitle("Break Finished")
    .addFields({
      name: `✅  \`${duration} minutes\``,
      value: `😌 Hope you enjoyed your breaks!`,
    })
    .setTimestamp(timestamp);
};

const endGroupBreakRow = groupEndRow;

module.exports = {
  groupStartEmbed,
  groupStartRow,
  groupEndEmbed,
  groupEndRow,
  startGroupBreakEmbed,
  startGroupBreakRow,
  endGroupBreakEmbed,
  endGroupBreakRow,
};
