import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // ✅ load env here

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendContactMail = async ({ name, email, phone, subject, message }) => {
  await transporter.sendMail({
    from: `"Srivatsasa & Koundinya Caterers – Contact Desk" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // owner receives
    subject: `New Enquiry: ${subject}`,
    html: `
      <h3>📩 New Contact Enquiry</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b><br/>${message}</p>
      <hr />
      <small>This message was sent from the SKC Catering website contact form.</small>
    `
  });
};
