import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cvRoutes from "./routes/cv.routes";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use("/api/cv", cvRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Skillara AI Backend corriendo" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Error no capturado:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Promesa rechazada:", reason);
});