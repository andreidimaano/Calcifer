const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuildSchema = new Schema({
  guildId: String,
  guildName: String,
  guildOwner: String,
  guildMemberCount: Number,
});

module.exports = {
  GuildModel: mongoose.model("Guild", GuildSchema),
};
