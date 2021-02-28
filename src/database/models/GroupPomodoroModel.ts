import { Schema } from '../../constants';
import mongoose from 'mongoose';

export const GroupPomodoroSchema = new Schema({
    authorId: String,
    authorTag: String,
    guildId: String,
    channelId: String,
    minutes: Number
});

export const GroupPomodoroModel = mongoose.model('GroupPomodoros', GroupPomodoroSchema);