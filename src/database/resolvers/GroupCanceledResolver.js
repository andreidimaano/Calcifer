const {
  GroupCancelBreakModel,
  GroupCancelWorkingModel,
} = require("../models/Group");

//create
let createGroupCanceled = async (guildId, channelId, isWork) => {
  try {
    if (isWork) {
      let newGroupCanceledWorking = new GroupCancelWorkingModel({
        guildId: guildId,
        channelId: channelId,
      });

      await newGroupCanceledWorking.save();
    } else {
      let newGroupCanceledBreak = new GroupCancelBreakModel({
        guildId: guildId,
        channelId: channelId,
      });

      await newGroupCanceledBreak.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//read
let isCanceledGroup = async (channelId) => {
  try {
    return await GroupCancelWorkingModel.exists({ channelId: channelId });
  } catch (error) {
    console.log(error);
  }
};

let isCanceledGroupBreak = async (channelId) => {
  try {
    return await GroupCancelBreakModel.exists({ channelId: channelId });
  } catch (error) {
    console.log(error);
  }
};

//delete
let deleteGroupCanceledPomodoro = async (channelId) => {
  try {
    await GroupCancelWorkingModel.deleteOne({
      channelId: channelId,
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteGroupCanceledBreak = async (channelId) => {
  try {
    await GroupCancelBreakModel.deleteOne({
      channelId: channelId,
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteAllCanceledGroup = async () => {
  try {
    await GroupCancelWorkingModel.deleteMany({});
    await GroupCancelBreakModel.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createGroupCanceled,
  isCanceledGroup,
  isCanceledGroupBreak,
  deleteGroupCanceledPomodoro,
  deleteGroupCanceledBreak,
  deleteAllCanceledGroup,
};
