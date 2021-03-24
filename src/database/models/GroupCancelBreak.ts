import { Schema } from '../../constants';
import mongoose from 'mongoose';

export const GroupCancelBreakSchema = new Schema({
    guildId: String,
    channelId: String,
});

export const GroupCancelBreakModel = mongoose.model('CanceledGroupBreakChannels', GroupCancelBreakSchema);