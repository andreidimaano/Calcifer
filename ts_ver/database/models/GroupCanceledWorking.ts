import { Schema } from "../../constants";
import mongoose from "mongoose";

export const GroupCancelWorkingSchema = new Schema({
  guildId: String,
  channelId: String,
});

export const GroupCancelWorkingModel = mongoose.model(
  "CanceledGroupWorkingChannels",
  GroupCancelWorkingSchema
);
