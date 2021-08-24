const { GroupBreakModel } = require("../models/Group");

//create
let createGroupBreak = async (channelId, authorId, authorTag) => {
  try {
    let newGroupBreak = new GroupBreakModel({
      channelId: channelId,
      authorId: authorId,
      authorTag: authorTag,
    });

    await newGroupBreak.save();
  } catch (error) {
    console.log(error);
  }
};

//read
let isGroupBreak = async (channelId) => {
  try {
    return await GroupBreakModel.exists({ channelId: channelId });
  } catch (error) {
    console.log(error);
  }
};

//delete
let deleteGroupBreak = async (channelId) => {
  try {
    await GroupBreakModel.deleteOne({ channelId: channelId });
  } catch (error) {
    console.log(error);
  }
};

let deleteGroupsBreak = async () => {
  try {
    await GroupBreakModel.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createGroupBreak,
  isGroupBreak,
  deleteGroupBreak,
  deleteGroupsBreak,
};
