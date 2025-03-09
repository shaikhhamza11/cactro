import express from 'express';
import { PORT } from './config/env.js';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.middleware.js';
import githubRouter from './routes/github.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes

app.use('/api/v1/github', githubRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(
    chalk.green.bold(`Cactro Github Test API running on:`),
    chalk.blue.underline(`http://localhost:${PORT}`),
  );
});
