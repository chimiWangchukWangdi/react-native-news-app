import 'dotenv/config';
export default {
  extra: {
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_API_PUSH_URL: process.env.BASE_API_PUSH_URL,
    API_KEY_NEWSAPI: process.env.API_KEY_NEWSAPI,
    API_KEY_NEWSDATA: process.env.PI_KEY_NEWSDATA,
  },
};