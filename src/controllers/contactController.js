// import Contact from "../models/Contact.js";
// import { sendContactMail } from "../utils/mailer.js";

// export const createContact = async (req, res) => {
//   try {
//     const { name, email, phone, subject, message } = req.body;

//     // Basic validation
//     if (!name || !email || !phone || !subject || !message) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // 1️⃣ Save to DB
//     const contact = await Contact.create({
//       name,
//       email,
//       phone,
//       subject,
//       message
//     });

//     // 2️⃣ Send Mail (uses EMAIL_USER & EMAIL_PASS from .env)
//     await sendContactMail({ name, email, phone, subject, message });

//     return res.status(201).json({
//       message: "Message sent successfully",
//       data: contact
//     });

//   } catch (error) {
//     console.error("Contact error:", error);
//     return res.status(500).json({ message: "Failed to send message" });
//   }
// };
// import Contact from "../models/Contact.js";
// import { sendContactMail } from "../utils/mailer.js";

// export const createContact = async (req, res) => {
//   try {
//     const { name, email, phone, subject, message } = req.body;

//     if (!name || !email || !phone || !subject || !message) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const contact = await Contact.create({
//       name,
//       email,
//       phone,
//       subject,
//       message
//     });

//     await sendContactMail({ name, email, phone, subject, message });

//     res.status(201).json({
//       message: "Message sent successfully",
//       data: contact
//     });
//   } catch (error) {
//     console.error("Contact error:", error);
//     res.status(500).json({ message: "Failed to send message" });
//   }
// };
// import Contact from "../models/Contact.js";

// export const createContact = async (req, res) => {
//   try {
//     const { name, email, phone, subject, message } = req.body;

//     if (!name || !email || !phone || !subject || !message) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const contact = await Contact.create({
//       name,
//       email,
//       phone,
//       subject,
//       message
//     });

//     return res.status(201).json({
//       message: "Message stored successfully (mail skipped)",
//       data: contact
//     });

//   } catch (error) {
//     console.error("Contact error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    console.log("BODY 👉", req.body); // 🔥 VERY IMPORTANT

    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
        bodyReceived: req.body
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      message: "Contact saved successfully ✅",
      data: contact
    });

  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
