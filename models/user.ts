// models/user.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  phoneNumber: string;
  uniqueId: string;
  lastFmToken?: string;
  lastFmSessionKey?: string;
}

const userSchema: Schema = new Schema({
  phoneNumber: { type: String, required: true },
  uniqueId: { type: String, required: true },
  lastFmToken: String,
  lastFmSessionKey: String,
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
