import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/authRoutes";
import dashboardRoutes from "./src/routes/dashboardRoutes";
import adminRoutes from "./src/routes/adminRoutes";
import fileRoutes from "./src/routes/fileRoutes";   // ✅ Added

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/files", fileRoutes);                 // ✅ Added

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));