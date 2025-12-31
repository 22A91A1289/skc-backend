// import express from "express";
// import { createContact } from "../controllers/contactController.js";

// const router = express.Router();

// // POST contact form
// router.post("/", createContact);

// export default router;

// import express from "express";
// import { createContact } from "../controllers/contactController.js";

// const router = express.Router();

// router.get("/test", (req, res) => {
//   res.json({ message: "Contact API working ✅" });
// });

// router.post("/", createContact);

// export default router;
import express from "express";
import { createContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContact);

export default router;

