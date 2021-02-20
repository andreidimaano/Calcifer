require('dotenv').config();
import mongoose from 'mongoose';
export const mongoUrl = process.env.MONGO_URL as string;
export const Schema = mongoose.Schema;
export const prefix = "c: ";
export interface userWorking extends mongoose.Document {
    discordId: string,
    discordTag: string,
    minutes: number,
    guildId: string
}