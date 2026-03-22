import express from "express";
import authRoutes from "./routes/authRoutes";
import fileRoutes from "./routes/fileRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/admin", adminRoutes);

export default app;