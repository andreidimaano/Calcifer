import { Schema } from '../../constants';
import mongoose from 'mongoose';

export const UserCanceledWorkingSchema = new Schema({
    discordId: String,
    discordTag: String,
});

export const UserCancelWorkingModel = mongoose.model('CanceledWorkingMembers', UserCanceledWorkingSchema );