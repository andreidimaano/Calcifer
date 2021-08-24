const mongoose = require("mongoose");
const { UserSchema } = require("../models/User");
const { GuildModel } = require("../models/Guild");

let createGuild = async (guildData) => {
  try {
    let newGuild = new GuildModel({
      guildId: guildData.id,
      guildName: guildData.toString(),
      guildOwner: guildData.ownerId,
      guildMemberCount: guildData.memberCount,
    });
    await newGuild.save();
  } catch (error) {
    console.log(error);
  }
};

//update
let updateGuild = async (guildData) => {
  try {
    let query = { guildName: guildData.toString() };
    let operation = { $set: { guildMemberCount: guildData.memberCount } };
    await GuildModel.findOneAndUpdate(query, operation).exec();
  } catch (error) {
    console.log(error);
  }
};

let getUserMinutes = async (guildId) => {
  try {
    let UserModel = mongoose.model(
      (guildId + "users").toLowerCase(),
      UserSchema
    );
    let user = await UserModel.find({});
    user.sort((a, b) => (a.minutesStudied > b.minutesStudied ? -1 : 1));
    user.splice(10, user.length - 10);
    for (let i = 0; i < user.length; i++) {
      console.log(i, user[i]);
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserMinutes,
  createGuild,
  updateGuild,
};
