import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routers/auth.routes.js";
import gearRoutes from "./routers/gear.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

if (process.env.DEVELOPMENT) {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use("/api/auth", authRoutes);
app.use("/api", gearRoutes);

if (process.env.DEVELOPMENT) {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
  });
}
// export const handler = serverless(app);
