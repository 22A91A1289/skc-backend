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
      return res.status(400).json({
        message: "All fields are required"
      });
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
    console.log("✅ Contact saved to database! ID:", contact._id);

    // 2️⃣ Send Mail (try-catch separately so DB save isn't affected)
    console.log("========================================");
    console.log("📧 STARTING EMAIL SEND PROCESS");
    console.log("========================================");
    
    let emailSent = false;
    let emailError = null;
    
    try {
      console.log("📧 Calling sendContactMail function...");
      console.log("📧 Email data:", { name, email, phone, subject, message: message.substring(0, 50) + "..." });
      
      const emailResult = await sendContactMail({
        name,
        email,
        phone,
        subject,
        message
      });
      
      console.log("📧 Email function returned:", emailResult ? "SUCCESS" : "NULL");
      
      if (emailResult && emailResult.messageId) {
        emailSent = true;
        console.log("✅✅✅ EMAIL SENT SUCCESSFULLY! ✅✅✅");
        console.log("✅ Message ID:", emailResult.messageId);
        console.log("✅ Response:", emailResult.response);
      } else {
        console.warn("⚠️⚠️⚠️ Email function returned but no messageId");
        console.warn("⚠️ Result:", emailResult);
      }
    } catch (mailError) {
      emailError = mailError;
      console.error("========================================");
      console.error("❌❌❌ EMAIL SENDING FAILED! ❌❌❌");
      console.error("========================================");
      console.error("❌ Error message:", mailError.message);
      console.error("❌ Error code:", mailError.code);
      console.error("❌ Error stack:", mailError.stack);
      
      try {
        console.error("❌ Full error JSON:", JSON.stringify(mailError, Object.getOwnPropertyNames(mailError)));
      } catch (e) {
        console.error("❌ Could not stringify error:", e);
      }
      
      if (mailError.response) {
        console.error("❌ SMTP Response:", mailError.response);
      }
      if (mailError.command) {
        console.error("❌ Failed command:", mailError.command);
      }
      if (mailError.responseCode) {
        console.error("❌ Response Code:", mailError.responseCode);
      }
    }
    
    console.log("========================================");
    console.log("📧 EMAIL PROCESS COMPLETED");
    console.log("📧 Status:", emailSent ? "SENT" : "FAILED");
    console.log("========================================");

    // 3️⃣ Response based on email status
    console.log("📤 Sending response to client...");
    console.log("📤 Email status:", emailSent ? "SENT" : "FAILED");
    
    if (emailSent) {
      const response = {
        message: "Message sent successfully 📩",
        data: contact,
        emailStatus: "sent"
      };
      console.log("📤 Response:", JSON.stringify(response, null, 2));
      return res.status(201).json(response);
    } else {
      const response = {
        message: "Message saved successfully, but email failed to send",
        data: contact,
        emailStatus: "failed",
        emailError: emailError ? emailError.message : "Unknown error"
      };
      console.log("📤 Response:", JSON.stringify(response, null, 2));
      return res.status(201).json(response);
    }

  } catch (error) {
    console.error("❌ Contact error:", error);
    console.error("❌ Error stack:", error.stack);
    
    // If contact was saved, return it even if there was an error
    if (contact) {
      return res.status(201).json({
        message: "Message saved, but there was an error",
        data: contact,
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }

    return res.status(500).json({
      message: "Failed to process contact form",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};
