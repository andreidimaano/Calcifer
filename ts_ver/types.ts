import { SlashCommandBuilder } from "@discordjs/builders";
import { Document } from "mongoose";

export type DiscordUserData = {
  guildId: string;
  discordId: string;
  discordTag: string;
};

export interface UserDoc extends Document {
  discordId: string;
  discordTag: string;
  minutesStudied: number;
}
export type CommandType = {
  data: SlashCommandBuilder;
  execute: Function;
};
