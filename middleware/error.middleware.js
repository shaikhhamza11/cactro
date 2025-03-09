import chalk from 'chalk';

const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(chalk.red.bold(err));

    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message || 'Server error' });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
