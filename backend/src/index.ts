/**
 * BACKEND SERVER ENTRY POINT
 *
 * This is the main server file that sets up the Express application.
 * It handles contact form submissions and email notifications.
 *
 * Features:
 * - Express server with TypeScript
 * - Security middleware (Helmet, CORS, Rate limiting)
 * - Contact form email API
 * - Error handling and logging
 *
 * Customization:
 * - Modify CORS origins for production
 * - Adjust rate limiting settings
 * - Add additional middleware
 * - Add new API routes
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Import API routes
import contactRoutes from "./routes/contact";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware - Helmet for security headers
app.use(helmet());

// Rate limiting - Prevent abuse and DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// CORS configuration - Allow frontend to access backend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

// Body parsing middleware - Parse JSON and URL-encoded data
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/contact", contactRoutes); // Contact form submissions

// Health check endpoint - For monitoring and load balancers
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Global error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({
      message: "Something went wrong!",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  },
);

// 404 handler - Catch all unmatched routes
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
