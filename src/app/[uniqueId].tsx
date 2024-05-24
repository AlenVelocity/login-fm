// pages/api/callback/[uniqueId].ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import dbConnect from '../lib/dbConnect';
import User from '../../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { uniqueId } = req.query;
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('Token is missing');
  }

  try {
    const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'auth.getSession',
        api_key: process.env.LASTFM_API_KEY,
        token,
        format: 'json',
      },
    });

    const { key: sessionKey } = response.data.session;

    await User.findOneAndUpdate({ uniqueId }, { lastFmToken: token as string, lastFmSessionKey: sessionKey });

    res.send('Logged in successfully. You can now use the bot.');
  } catch (error) {
    console.error('Error fetching Last.fm session:', error);
    res.status(500).send('Failed to log in to Last.fm.');
  }
}
