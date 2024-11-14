import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Mount task routes
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error("Error occurred:", err.message); // Log error
  res.status(500).send({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
