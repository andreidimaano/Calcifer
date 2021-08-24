const {
  GroupCancelBreakModel,
  GroupCancelWorkingModel,
} = require("../models/Group");
const {
  UserCancelBreakModel,
  UserCancelWorkingModel,
} = require("../models/User");

//create
let createUserCanceled = async (discordId, discordTag, isStudy) => {
  try {
    if (isStudy) {
      let newUserCanceledWorking = new UserCancelWorkingModel({
        discordId: discordId,
        discordTag: discordTag,
      });

      await newUserCanceledWorking.save();
    } else {
      let newUserCanceledBreak = new UserCancelBreakModel({
        discordId: discordId,
        discordTag: discordTag,
      });

      await newUserCanceledBreak.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//read
let isCanceledPomodoro = async (discordId) => {
  try {
    return await UserCancelWorkingModel.exists({ discordId: discordId });
  } catch (error) {
    console.log(error);
  }
};
let isCanceledBreak = async (discordId) => {
  try {
    return await UserCancelBreakModel.exists({ discordId: discordId });
  } catch (error) {
    console.log(error);
  }
};

//delete
let deleteUserCanceledPomodoro = async (discordId) => {
  try {
    await UserCancelWorkingModel.deleteOne({
      discordId: discordId,
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteUserCanceledBreak = async (discordId) => {
  try {
    await UserCancelBreakModel.deleteOne({
      discordId: discordId,
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteAllCanceled = async () => {
  try {
    await UserCancelBreakModel.deleteMany({});
    await UserCancelWorkingModel.deleteMany({});
    await GroupCancelWorkingModel.deleteMany({});
    await GroupCancelBreakModel.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUserCanceled,
  isCanceledPomodoro,
  isCanceledBreak,
  deleteUserCanceledPomodoro,
  deleteUserCanceledBreak,
  deleteAllCanceled,
};
