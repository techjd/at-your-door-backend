import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log To Console For Developer
  console.log(err);
  // Mongoose Bad ObjectId

  if (err.name === 'CastError') {
    const message = `Resource Not Found`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
