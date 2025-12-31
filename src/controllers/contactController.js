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

// import Contact from "../models/Contact.js";

// export const createContact = async (req, res) => {
//   try {
//     console.log("BODY 👉", req.body); // 🔥 VERY IMPORTANT

//     const { name, email, phone, subject, message } = req.body;

//     if (!name || !email || !phone || !subject || !message) {
//       return res.status(400).json({
//         message: "All fields are required",
//         bodyReceived: req.body
//       });
//     }

//     const contact = await Contact.create({
//       name,
//       email,
//       phone,
//       subject,
//       message
//     });

//     res.status(201).json({
//       message: "Contact saved successfully ✅",
//       data: contact
//     });

//   } catch (error) {
//     console.error("Contact error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// 
import Contact from "../models/Contact.js";
import { sendContactMail } from "../utils/mailer.js";

export const createContact = async (req, res) => {
  let contact = null;

  try {
    console.log("========================================");
    console.log("📥 CONTACT FORM REQUEST RECEIVED");
    console.log("📥 Body:", JSON.stringify(req.body, null, 2));
    console.log("========================================");

    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      console.log("❌ Validation failed - missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("✅ Validation passed, saving to database...");

    // 1️⃣ Save to DB
    contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    console.log("✅ Contact saved! ID:", contact._id);

    // 2️⃣ Send Mail
    console.log("========================================");
    console.log("📧 STARTING EMAIL SEND PROCESS");
    console.log("========================================");

    let emailSent = false;
    let emailError = null;

    try {
      const emailResult = await sendContactMail({
        name,
        email,
        phone,
        subject,
        message
      });

      console.log("📧 Raw emailResult:", emailResult);

      // ✅ SENDGRID SUCCESS CHECK
      if (
        Array.isArray(emailResult) &&
        emailResult[0] &&
        emailResult[0].statusCode === 202
      ) {
        emailSent = true;
        console.log("✅ EMAIL SENT SUCCESSFULLY");
        console.log("✅ SendGrid Message ID:", emailResult[0].headers["x-message-id"]);
      } else {
        console.warn("⚠️ Email response unexpected:", emailResult);
      }

    } catch (err) {
      emailError = err;
      console.error("❌ EMAIL FAILED:", err.message);
    }

    console.log("========================================");
    console.log("📧 EMAIL PROCESS COMPLETED");
    console.log("📧 Status:", emailSent ? "SENT" : "FAILED");
    console.log("========================================");

    // 3️⃣ Response
    if (emailSent) {
      return res.status(201).json({
        message: "Message sent successfully 📩",
        data: contact,
        emailStatus: "sent"
      });
    }

    return res.status(201).json({
      message: "Message saved successfully, but email failed to send",
      data: contact,
      emailStatus: "failed",
      emailError: emailError ? emailError.message : "Unknown error"
    });

  } catch (error) {
    console.error("❌ Controller error:", error);

    if (contact) {
      return res.status(201).json({
        message: "Message saved, but unexpected error occurred",
        data: contact
      });
    }

    return res.status(500).json({ message: "Server error" });
  }
};
