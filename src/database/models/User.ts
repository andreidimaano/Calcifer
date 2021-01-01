import { Schema } from '../../constants';

export const UserSchema = new Schema({
    discordId: String,
    discordTag: String,
    minutesStudied: Number,
});
