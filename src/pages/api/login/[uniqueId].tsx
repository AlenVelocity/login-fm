// pages/api/callback/[uniqueId].ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/models/user';
import LastFM from '../../../lib/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { uniqueId } = req.query;
  const data = LastFM.findOne({ uniqueId: uniqueId });
  if (!data) {
    return res.status(400).send('Token is missing');
  }
  try {
    const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    res.redirect('http://www.last.fm/api/auth/' + 'api_key=' + process.env.LASTFM_API_KEY + '&cb=' + url + '/api/callback/' + uniqueId);

  } catch (error) {
    console.error('Error fetching Last.fm session:', error);
    res.status(500).send('Failed to log in to Last.fm.');
  }
}
