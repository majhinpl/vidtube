import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Log the error for debugging (consider a logging library in production)
  console.error("Error:", err);

  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Something went wrong";

    // Handle specific error types
    if (error instanceof mongoose.Error) {
      if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed";
      } else if (error.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
      } else {
        statusCode = 400; // Fallback for other Mongoose errors
      }
    } else if (error.name === "JsonWebTokenError") {
      statusCode = 401;
      message = "Invalid or expired token";
    } else if (error.name === "SyntaxError" && error.status === 400) {
      statusCode = 400;
      message = "Invalid JSON payload";
    }

    // Create a new ApiError instance
    error = new ApiError(statusCode, message, error?.errors || [], error.stack);
  }

  // Construct response object
  const isDevelopment = !["production", "test"].includes(process.env.NODE_ENV);
  const response = {
    success: false, // Optional: Indicate failure
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(isDevelopment ? { stack: error.stack } : {}),
  };

  // Send response
  return res.status(error.statusCode).json(response);
};

export default errorHandler;
