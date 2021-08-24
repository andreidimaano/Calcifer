const { UserWorkingModel } = require("../models/User");

//create
let createUserWorking = async (guildId, discordId, discordTag, minutes) => {
  try {
    let newUserStudying = new UserWorkingModel({
      discordId: discordId,
      discordTag: discordTag,
      minutes: minutes,
      guildId: guildId,
    });

    await newUserStudying.save();
  } catch (error) {
    console.log(error);
  }
};

//read
let isWorking = async (discordId) => {
  try {
    return await UserWorkingModel.exists({ discordId: discordId });
  } catch (error) {
    console.log(error);
  }
};

//delete
let deleteUserWorking = async (discordId) => {
  try {
    await UserWorkingModel.deleteOne({
      discordId: discordId,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUserWorking,
  isWorking,
  deleteUserWorking,
};
