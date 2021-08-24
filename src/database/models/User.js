const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Status
const UserWorkingSchema = new Schema({
  discordId: String,
  discordTag: String,
  minutes: Number,
  guildId: String,
});

const UserBreakSchema = new Schema({
  discordId: String,
  discordTag: String,
});

//Cancel
const UserCanceledBreakSchema = new Schema({
  discordId: String,
  discordTag: String,
});

const UserCanceledWorkingSchema = new Schema({
  discordId: String,
  discordTag: String,
});

module.exports = {
  UserSchema: new Schema({
    discordId: String,
    discordTag: String,
    minutesStudied: Number,
  }),
  UserBreakModel: mongoose.model("BreakMembers", UserBreakSchema),
  UserWorkingModel: mongoose.model("WorkingMembers", UserWorkingSchema),
  UserCancelBreakModel: mongoose.model(
    "CanceledBreakMembers",
    UserCanceledBreakSchema
  ),
  UserCancelWorkingModel: mongoose.model(
    "CanceledWorkingMembers",
    UserCanceledWorkingSchema
  ),
};
