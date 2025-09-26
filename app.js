import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({
  silent: true,
});
import express from "express";
import cors from "cors";
import { useAuthVerifier } from "./middlewares/authverifier.middleware.js";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import inventRouter from "./routes/inventory.router.js";
import pengajuanRouter from "./routes/pengajuan.router.js";
const app = express();

//=======DB CONNECTION
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/inventory", useAuthVerifier, inventRouter);
app.use("/api/v1/pengajuan", useAuthVerifier, pengajuanRouter);

export default app;
