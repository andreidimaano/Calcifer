const { GroupPomodoroModel } = require("../models/Group");

//create
let createGroup = async (authorId, authorTag, guildId, channelId, minutes) => {
  try {
    console.log("authorID:");
    console.log(authorId);
    let newGroup = new GroupPomodoroModel({
      authorId: authorId,
      authorTag: authorTag,
      guildId: guildId,
      channelId: channelId,
      minutes: minutes,
    });

    await newGroup.save();
  } catch (error) {
    console.log(error);
  }
};

//read
let groupExists = async (channelId) => {
  try {
    return await GroupPomodoroModel.exists({ channelId: channelId });
  } catch (error) {
    console.log(error);
  }
};

let isAuthor = async (authorId) => {
  try {
    return await GroupPomodoroModel.exists({ authorId: authorId });
  } catch (error) {
    console.log(error);
  }
};

let getAuthor = async (channelId) => {
  try {
    return await GroupPomodoroModel.findOne({ channelId: channelId })
      .lean()
      .exec();
  } catch (error) {
    console.log(error);
  }
};

//delete
let deleteGroup = async (channelId) => {
  try {
    await GroupPomodoroModel.deleteMany({
      channelId: channelId,
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteAllGroups = async () => {
  try {
    await GroupPomodoroModel.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createGroup,
  groupExists,
  isAuthor,
  getAuthor,
  deleteGroup,
  deleteAllGroups,
};
