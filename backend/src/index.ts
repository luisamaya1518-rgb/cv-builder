import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cvRoutes from "./routes/cv.routes";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://cv-builder-livid-two.vercel.app",
  "https://cv-builder-skillara.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requests sin origin (Postman, Render health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS bloqueado para origen: ${origin}`));
    }
  },
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
  console.log(`Orígenes permitidos: ${allowedOrigins.join(", ")}`);
});

process.on("uncaughtException", (err) => {
  console.error("Error no capturado:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Promesa rechazada:", reason);
});