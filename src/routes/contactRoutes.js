// import express from "express";
// import { createContact } from "../controllers/contactController.js";

// const router = express.Router();

// // POST contact form
// router.post("/", createContact);

// export default router;
import express from "express";
import { createContact } from "../controllers/contactController.js";

const router = express.Router();
router.post("/", createContact);

export default router;
