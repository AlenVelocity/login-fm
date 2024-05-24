// models/user.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface lastFM extends Document {
  jid: string;
  uniqueId: string;
  lastFmToken?: string;
  lastFmSessionKey?: string;
}

const lastFM: Schema = new Schema({
  jid: { type: String, required: true },
  uniqueId: { type: String, required: true },
  lastFmToken: String,
  lastFmSessionKey: String,
});

const LastFM = mongoose.models.User || mongoose.model<lastFM>('lastfm', lastFM);

export default LastFM;
