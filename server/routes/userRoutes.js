// routes/userRoutes.js
import express from "express";
import { getApplicants } from '../controllers/userController.js';
import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/applicants", adminAuth, getApplicants);

export default router;
