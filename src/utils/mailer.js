import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // ✅ load env here

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL_USER or EMAIL_PASS not set in environment variables!");
}

// Create transporter with port 465 (SSL) - works better with Render
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 60000, // 60 seconds for Render
  greetingTimeout: 30000,
  socketTimeout: 60000,
  pool: true,
  maxConnections: 1,
  maxMessages: 3
});

// Verify transporter configuration (non-blocking, don't fail on startup)
transporter.verify(function (error, success) {
  if (error) {
    console.warn("⚠️ Email transporter verification failed (will retry on send):", error.message);
    console.warn("⚠️ This is normal on Render - connection will be established when sending");
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
    
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    console.log("📧 EMAIL_USER exists:", !!emailUser);
    console.log("📧 EMAIL_PASS exists:", !!emailPass);
    console.log("📧 EMAIL_USER value:", emailUser ? `${emailUser.substring(0, 3)}***` : "NOT SET");
    
    if (!emailUser) {
      console.error("❌ EMAIL_USER is not configured!");
      throw new Error("EMAIL_USER not configured");
    }
    
    if (!emailPass) {
      console.error("❌ EMAIL_PASS is not configured!");
      throw new Error("EMAIL_PASS not configured");
    }
    
    console.log("✅ Environment variables check passed");

    const mailOptions = {
      from: `"Srivatsasa & Koundinya Caterers" <${emailUser}>`,
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
    console.log("📧 Email config check:", {
      hasUser: !!process.env.EMAIL_USER,
      hasPass: !!process.env.EMAIL_PASS,
      userLength: process.env.EMAIL_USER?.length || 0
    });
    console.log("📧 Using SMTP: smtp.gmail.com:465 (SSL)");
    
    // Send email with timeout wrapper
    console.log("📧 Establishing SMTP connection and sending email...");
    console.log("📧 Start time:", new Date().toISOString());
    
    // Create a promise with timeout
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Email send timeout after 30 seconds"));
      }, 30000); // 30 second timeout
    });
    
    let info;
    try {
      info = await Promise.race([sendPromise, timeoutPromise]);
      console.log("📧 Email send completed at:", new Date().toISOString());
    } catch (timeoutError) {
      console.error("❌ Email send timed out!");
      throw timeoutError;
    }
    
    console.log("📧 Email send result:", {
      hasInfo: !!info,
      hasMessageId: !!info?.messageId,
      response: info?.response,
      accepted: info?.accepted,
      rejected: info?.rejected
    });
    
    if (!info || !info.messageId) {
      console.error("❌ Email sent but no messageId received!");
      console.error("❌ Info object:", JSON.stringify(info, null, 2));
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
    console.error("❌ Error stack:", error.stack);
    
    if (error.response) {
      console.error("❌ SMTP Response:", error.response);
    }
    if (error.responseCode) {
      console.error("❌ Response Code:", error.responseCode);
    }
    if (error.command) {
      console.error("❌ Failed command:", error.command);
    }
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      console.error("❌❌❌ CONNECTION ERROR - Render may be blocking SMTP ports!");
      console.error("❌ Consider using Resend, SendGrid, or Mailgun instead of Gmail SMTP");
    }
    
    console.error("========================================");
    throw error;
  }
};
