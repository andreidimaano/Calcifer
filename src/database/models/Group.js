const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Pom
const GroupPomodoroSchema = new Schema({
  authorId: String,
  authorTag: String,
  guildId: String,
  channelId: String,
  minutes: Number,
});

const GroupBreakSchema = new Schema({
  channelId: String,
  authorId: String,
  authorTag: String,
});

// Cancel
const GroupCancelBreakSchema = new Schema({
  guildId: String,
  channelId: String,
});

const GroupCancelWorkingSchema = new Schema({
  guildId: String,
  channelId: String,
});

module.exports = {
  GroupPomodoroModel: mongoose.model("GroupPomodoros", GroupPomodoroSchema),
  GroupBreakModel: mongoose.model("GroupBreakChannels", GroupBreakSchema),
  GroupCancelWorkingModel: mongoose.model(
    "CanceledGroupWorkingChannels",
    GroupCancelWorkingSchema
  ),
  GroupCancelBreakModel: mongoose.model(
    "CanceledGroupBreakChannels",
    GroupCancelBreakSchema
  ),
};
