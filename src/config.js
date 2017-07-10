import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_URI_TEST: process.env.MONGO_URI_TEST,
  YOUTUBE_KEY: process.env.YOUTUBE_KEY,
  VK_KEY: process.env.VK_KEY,
};
