const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';

    // Send the error response
    res.status(statusCode).json({
        status: statusCode,
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Only show stack trace in development
    });
  };

export default errorHandler;