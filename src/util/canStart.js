const { isGroupBreak } = require("../database/resolvers/GroupBreakResolver");
const { groupExists } = require("../database/resolvers/GroupPomodoroResolver");
const { isOnBreak } = require("../database/resolvers/UserOnBreakResolver");
const { isWorking } = require("../database/resolvers/UserWorking");

let canStartPomodoro = async (message) => {
  let authorId = message.author.id;
  let currentlyWorking = await isWorking(authorId);
  if (currentlyWorking) {
    await message.reply("```Error: You're already working!```");
    return false;
  }

  let currentlyOnBreak = await isOnBreak(authorId);
  if (currentlyOnBreak) {
    await message.reply("```Error: You're on break!```");
    return false;
  }

  return true;
};

let canStartGroup = async (message) => {
  let connected = message.member.voice.channelId;
  let channelId = message.channel.id;
  let groupPomInProgress = await groupExists(channelId);
  let groupBreakInProgress = await isGroupBreak(channelId);
  if (groupPomInProgress) {
    await message.reply("```Error: Group Pomdoro in Progress```");
    return false;
  } else if (groupBreakInProgress) {
    await message.reply("```Error: Group Break in Progress```");
    return false;
  } else if (connected === null) {
    await message.reply(
      "```Error: You are not connected to a voice channel```"
    );
    return false;
  } else if (!message.member?.voice?.channel?.name.includes("group")) {
    await message.reply(
      "```Error: You are not connected to a group pomodoro voice channel```"
    );
    return false;
  } else if (
    message.channel.type === "GUILD_TEXT" &&
    !message.channel.name.includes("group")
  ) {
    await message.reply(
      "You can only start a group pomodoro in the group text channel"
    );
    return false;
  }

  return true;
};

module.exports = {
  canStartGroup,
  canStartPomodoro,
};
