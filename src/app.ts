import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["https://client.udayhasan.dev", "https://blog.udayhasan.dev"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.get("/api/health", (_, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
export default app;
