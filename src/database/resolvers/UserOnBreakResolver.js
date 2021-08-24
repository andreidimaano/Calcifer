const { UserBreakModel } = require("../models/User");

//create
let createUserOnBreak = async (discordId, discordTag) => {
  try {
    let newUserOnBreak = new UserBreakModel({
      discordId: discordId,
      discordTag: discordTag,
    });

    await newUserOnBreak.save();
  } catch (error) {
    console.log(error);
  }
};

//read
let isOnBreak = async (discordId) => {
  try {
    return await UserBreakModel.exists({ discordId: discordId });
  } catch (error) {
    console.log(error);
  }
};

//delete
let deleteUserOnBreak = async (discordId) => {
  try {
    await UserBreakModel.deleteOne({
      discordId: discordId,
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteUsersOnBreak = async () => {
  try {
    await UserBreakModel.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUserOnBreak,
  isOnBreak,
  deleteUserOnBreak,
  deleteUsersOnBreak,
};
