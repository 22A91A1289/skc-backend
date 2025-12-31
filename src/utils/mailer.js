import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config(); // ✅ load env here

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Validate environment variables
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY not set in environment variables!");
} else {
  console.log("✅ Resend API key configured");
}

if (!process.env.EMAIL_USER) {
  console.error("❌ EMAIL_USER not set (needed for 'to' address)!");
} else {
  console.log("✅ EMAIL_USER configured:", process.env.EMAIL_USER.substring(0, 3) + "***");
}

export const sendContactMail = async ({ name, email, phone, subject, message }) => {
  console.log("========================================");
  console.log("📧📧📧 SENDCONTACTMAIL FUNCTION CALLED 📧📧📧");
  console.log("========================================");
  console.log("📧 Parameters received:", { name, email, phone, subject });
  
  try {
    console.log("📧 Checking environment variables...");
    
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailUser = process.env.EMAIL_USER;
    
    console.log("📧 RESEND_API_KEY exists:", !!resendApiKey);
    console.log("📧 EMAIL_USER exists:", !!emailUser);
    console.log("📧 EMAIL_USER value:", emailUser ? `${emailUser.substring(0, 3)}***` : "NOT SET");
    
    if (!resendApiKey) {
      console.error("❌ RESEND_API_KEY is not configured!");
      throw new Error("RESEND_API_KEY not configured");
    }
    
    if (!emailUser) {
      console.error("❌ EMAIL_USER is not configured!");
      throw new Error("EMAIL_USER not configured");
    }
    
    console.log("✅ Environment variables check passed");
    console.log("📧 Using Resend API (HTTP - no SMTP blocking issues)");

    const emailContent = {
      from: "Srivatsasa & Koundinya Caterers <onboarding@resend.dev>", // Resend default domain
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
    console.log("📧 Sending email via Resend API...");
    
    // Send email using Resend
    const { data, error } = await resend.emails.send(emailContent);
    
    if (error) {
      console.error("❌ Resend API error:", error);
      throw new Error(`Resend API error: ${error.message || JSON.stringify(error)}`);
    }
    
    if (!data || !data.id) {
      console.error("❌ Email sent but no ID received!");
      console.error("❌ Response data:", JSON.stringify(data, null, 2));
      throw new Error("Email sent but no ID received from Resend");
    }
    
    console.log("📧 Email send completed at:", new Date().toISOString());
    console.log("✅✅✅ EMAIL SENT SUCCESSFULLY! ✅✅✅");
    console.log("✅ Resend Email ID:", data.id);
    
    // Return in similar format to nodemailer for compatibility
    return {
      messageId: data.id,
      accepted: [emailUser],
      rejected: [],
      response: `Resend API success: ${data.id}`
    };
  } catch (error) {
    console.error("========================================");
    console.error("❌❌❌ EMAIL SENDING FAILED! ❌❌❌");
    console.error("========================================");
    console.error("❌ Error message:", error.message);
    console.error("❌ Error name:", error.name);
    console.error("❌ Error stack:", error.stack);
    
    if (error.response) {
      console.error("❌ API Response:", error.response);
    }
    
    console.error("========================================");
    throw error;
  }
};
