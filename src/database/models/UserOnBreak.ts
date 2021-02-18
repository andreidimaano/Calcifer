import { Schema } from '../../constants';
import mongoose from 'mongoose';

export const UserBreakSchema = new Schema({
    discordId: String,
    discordTag: String,
});

export const UserBreakModel = mongoose.model('BreakMembers', UserBreakSchema);