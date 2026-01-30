import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { attachIdentity } from "./middleware/auth";
import { salariesRouter } from "./routes/salaries";
import { connectDB } from "./db";
import systemAssetsRouter from "./routes/systemAssets";
import pcLaptopsRouter from "./routes/pcLaptops";
import employeesRouter from "./routes/employees";

export async function createServer() {
  const app = express();

  // Connect to MongoDB
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(attachIdentity);

  // Static for uploaded files
  app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Salaries API
  app.use("/api/salaries", salariesRouter());

  // MongoDB API routes
  app.use("/api/system-assets", systemAssetsRouter);
  app.use("/api/pc-laptops", pcLaptopsRouter);
  app.use("/api/employees", employeesRouter);

  return app;
}
