import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // ✅ load env here

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL_USER or EMAIL_PASS not set in environment variables!");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Email transporter verification failed:", error);
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
    
    // Send email with explicit promise handling
    const info = await Promise.resolve(transporter.sendMail(mailOptions));
    
    if (!info || !info.messageId) {
      throw new Error("Email sent but no messageId received");
    }
    
    console.log("✅ Email sent successfully!");
    console.log("✅ Message ID:", info.messageId);
    console.log("✅ Response:", info.response);
    console.log("✅ Accepted:", info.accepted);
    console.log("✅ Rejected:", info.rejected);
    
    return info;
  } catch (error) {
    console.error("❌ Email sending failed!");
    console.error("❌ Error message:", error.message);
    console.error("❌ Error code:", error.code);
    if (error.response) {
      console.error("❌ SMTP Response:", error.response);
    }
    if (error.command) {
      console.error("❌ Failed command:", error.command);
    }
    throw error;
  }
};
