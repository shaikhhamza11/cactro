import { config } from 'dotenv';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

export const { PORT, GITHUB_TOKEN, GITHUB_URL, GITHUB_USERNAME } = process.env;
