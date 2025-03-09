import express from 'express';
import { PORT } from './config/env.js';
import chalk from 'chalk';

const app = express();

app.listen(PORT, () => {
  console.log(
    chalk.green.bold(`Cactro Github Test API running on:`),
    chalk.blue.underline(`http://localhost:${PORT}`),
  );
});
