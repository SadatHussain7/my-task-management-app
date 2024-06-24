import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

export default app;
