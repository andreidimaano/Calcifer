const mongoose = require("mongoose");
const { UserSchema } = require("../models/User");

//create
let createUser = async (userData, minutesStudied) => {
  try {
    let guildName = (userData.guildId + "users").toLowerCase();
    let User = mongoose.model(guildName, UserSchema);
    let isUser = await userExists(userData);

    if (!isUser) {
      let newUser = new User({
        discordId: userData.discordId,
        discordTag: userData.discordTag,
        minutesStudied: minutesStudied,
      });
      await newUser.save();
    }

    console.log("check database");
  } catch (error) {
    console.log(error);
  }
};

//read
let getUserMinutesStudied = async (userData) => {
  try {
    let UserModel = mongoose.model(
      (userData.guildId + "users").toLowerCase(),
      UserSchema
    );
    let user = await UserModel.findOne({
      discordId: userData.discordId,
    }).exec();

    return user.minutesStudied;
  } catch (error) {
    console.log(error);
  }
};

//update
let updateUser = async (userData, minutesStudied) => {
  try {
    let User = mongoose.model(
      (userData.guildId + "users").toLowerCase(),
      UserSchema
    );
    let query = { discordId: userData.discordId };
    let operation = { $inc: { minutesStudied: minutesStudied } };

    await User.findOneAndUpdate(query, operation).exec();
  } catch (error) {
    console.log(error);
  }
};

//helper
let userExists = async (userData) => {
  try {
    let User = mongoose.model(
      (userData.guildId + "users").toLowerCase(),
      UserSchema
    );
    return await User.exists({ discordId: userData.discordId });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getUserMinutesStudied,
  updateUser,
  userExists,
};
