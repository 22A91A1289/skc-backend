import express from "express";
import { getMenuPackages } from "../controllers/menuPackageController.js";

const router = express.Router();

router.get("/", getMenuPackages);

export default router;
