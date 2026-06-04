import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import cookieParser from "cookie-parser";
const app: Application = express();

// Middlewares
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://insta-web-task-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser
    ());



// Health Check Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/leads", leadRoutes);


export default app;