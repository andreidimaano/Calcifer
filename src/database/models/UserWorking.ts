import { Schema } from '../../constants';
import mongoose from 'mongoose';

export const UserWorkingSchema = new Schema({
    discordId: String,
    discordTag: String,
    minutes: Number,
});

export const UserWorkingModel = mongoose.model('WorkingMembers', UserWorkingSchema);