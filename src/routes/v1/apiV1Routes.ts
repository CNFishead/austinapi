import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import uploadRoutes from "./uploadRoutes";
import projectRoutes from "./projectRoutes";
import blogRoutes from "./blogRoutes";
import experienceRoutes from "./experienceRoutes";

const router = express.Router();

// Import all of our routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/upload", uploadRoutes);
router.use("/project", projectRoutes);
router.use("/blog", blogRoutes);
router.use("/experience", experienceRoutes);

export default router;
