import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // ✅ load env here

// Use SendGrid SMTP instead of Gmail - works better with Render
// SendGrid allows SMTP connections from cloud platforms
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "apikey", // SendGrid requires 'apikey' as username
    pass: process.env.SENDGRID_API_KEY // Your SendGrid API key
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000
});

// Alternative: If you want to use Gmail, uncomment below and comment SendGrid config
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
//   tls: {
//     rejectUnauthorized: false
//   },
//   connectionTimeout: 30000,
//   greetingTimeout: 30000,
//   socketTimeout: 30000
// });

// Verify transporter configuration (non-blocking)
transporter.verify(function (error, success) {
  if (error) {
    console.warn("⚠️ Email transporter verification failed (will retry on send):", error.message);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

export const sendContactMail = async ({ name, email, phone, subject, message }) => {
  console.log("========================================");
  console.log("📧📧📧 SENDCONTACTMAIL FUNCTION CALLED 📧📧📧");
  console.log("========================================");
  console.log("📧 Parameters received:", { name, email, phone, subject });
  
  try {
    console.log("📧 Checking environment variables...");
    
    // For SendGrid
    const sendgridKey = process.env.SENDGRID_API_KEY;
    const emailUser = process.env.EMAIL_USER;
    
    // For Gmail (if using)
    // const emailUser = process.env.EMAIL_USER;
    // const emailPass = process.env.EMAIL_PASS;
    
    console.log("📧 SENDGRID_API_KEY exists:", !!sendgridKey);
    console.log("📧 EMAIL_USER exists:", !!emailUser);
    console.log("📧 EMAIL_USER value:", emailUser ? `${emailUser.substring(0, 3)}***` : "NOT SET");
    
    if (!sendgridKey) {
      console.error("❌ SENDGRID_API_KEY is not configured!");
      throw new Error("SENDGRID_API_KEY not configured");
    }
    
    if (!emailUser) {
      console.error("❌ EMAIL_USER is not configured!");
      throw new Error("EMAIL_USER not configured");
    }
    
    console.log("✅ Environment variables check passed");
    console.log("📧 Using SendGrid SMTP (smtp.sendgrid.net:587)");

    const mailOptions = {
      from: `"Srivatsasa & Koundinya Caterers" <${emailUser}>`, // Your verified email in SendGrid
      to: emailUser, // owner receives
      replyTo: email, // Reply goes to customer
      subject: `New Enquiry: ${subject}`,
      text: `
New Contact Enquiry

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

---
This message was sent from the SKC Catering website contact form.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #333;">📩 New Contact Enquiry</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #fff; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <small style="color: #666;">This message was sent from the SKC Catering website contact form.</small>
        </div>
      `
    };

    console.log("📧 Sending to:", emailUser);
    console.log("📧 Start time:", new Date().toISOString());
    console.log("📧 Establishing SMTP connection and sending email...");
    
    // Send email with timeout
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Email send timeout after 25 seconds"));
      }, 25000);
    });
    
    let info;
    try {
      info = await Promise.race([sendPromise, timeoutPromise]);
      console.log("📧 Email send completed at:", new Date().toISOString());
    } catch (timeoutError) {
      console.error("❌ Email send timed out!");
      throw timeoutError;
    }
    
    if (!info || !info.messageId) {
      console.error("❌ Email sent but no messageId received!");
      throw new Error("Email sent but no messageId received");
    }
    
    console.log("✅✅✅ EMAIL SENT SUCCESSFULLY! ✅✅✅");
    console.log("✅ Message ID:", info.messageId);
    console.log("✅ Response:", info.response);
    console.log("✅ Accepted:", info.accepted);
    console.log("✅ Rejected:", info.rejected);
    
    return info;
  } catch (error) {
    console.error("========================================");
    console.error("❌❌❌ EMAIL SENDING FAILED! ❌❌❌");
    console.error("========================================");
    console.error("❌ Error message:", error.message);
    console.error("❌ Error code:", error.code);
    console.error("❌ Error name:", error.name);
    
    if (error.response) {
      console.error("❌ SMTP Response:", error.response);
    }
    if (error.command) {
      console.error("❌ Failed command:", error.command);
    }
    
    console.error("========================================");
    throw error;
  }
};
