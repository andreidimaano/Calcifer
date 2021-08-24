import { Schema } from "../../constants";
import mongoose from "mongoose";

export const UserCanceledBreakSchema = new Schema({
  discordId: String,
  discordTag: String,
});

export const UserCancelBreakModel = mongoose.model(
  "CanceledBreakMembers",
  UserCanceledBreakSchema
);
