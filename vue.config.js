import dotenv from 'dotenv';
import express from 'express';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Pass the environment variables to the client
app.get('/env', (req, res) => {
  res.json({
    VUE_APP_API_URL: process.env.VUE_APP_API_URL,
  });
});

export default {
  devServer: {
    before: (app) => {
      app.use(app);
    },
  },
};
