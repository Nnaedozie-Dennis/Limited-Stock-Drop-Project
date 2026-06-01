
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import reservationRoutes from "./routes/reservationRoutes";
import checkoutRoutes from './routes/checkoutRoutes';
import { startExpirationJob } from "./jobs/expirationJob";






const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Vite default + React
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("combined"));
app.use(requestLogger);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: "Limited Stock Drop API is running",
    endpoints: {
      health: "GET /health",
      reserve: "POST /api/reserve",
      checkout: "POST /api/checkout"
    }
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

app.use('/api', reservationRoutes);
app.use('/api', checkoutRoutes);

// Metrics (Simple)
app.get("/metrics", (req, res) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

// TODO: Routes will be added later

// Centralized Error Handler
app.use(errorHandler);
// Start background job
startExpirationJob();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});