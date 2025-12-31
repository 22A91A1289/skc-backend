// import express from "express";
// import { getMenu, getMenuPdf } from "../controllers/menuController.js";

// const router = express.Router();

// router.get("/", getMenu);        // GET /api/menu
// router.get("/pdf", getMenuPdf);  // GET /api/menu/pdf

// export default router;
import express from "express";
import { getMenu, getMenuPdf } from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getMenu);
router.get("/pdf/:type", getMenuPdf);

export default router;
