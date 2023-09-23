import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import uploadRoutes from "./uploadRoutes";
import projectRoutes from "./projectRoutes";
import blogRoutes from "./blogRoutes";
import experienceRoutes from "./experienceRoutes";
import utilRoutes from "./utilRoutes";
import cloudinaryRoutes from "./cloudinaryRoutes";
import certifacteRoutes from "./certificateRoutes";

const router = express.Router();

// Import all of our routes
router.use("/auth", authRoutes);
router.use("/cloudinary", cloudinaryRoutes);
router.use("/user", userRoutes);
router.use("/upload", uploadRoutes);
router.use("/project", projectRoutes);
router.use("/blog", blogRoutes);
router.use("/experience", experienceRoutes);
router.use("/util", utilRoutes);
router.use("/certificate", certifacteRoutes);

export default router;
