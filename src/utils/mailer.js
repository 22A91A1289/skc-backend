// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config(); // ✅ load env here

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// export const sendContactMail = async ({ name, email, phone, subject, message }) => {
//   await transporter.sendMail({
//     from: `"Srivatsasa & Koundinya Caterers – Contact Desk" <${process.env.EMAIL_USER}>`,
//     to: process.env.EMAIL_USER, // owner receives
//     subject: `New Enquiry: ${subject}`,
//     html: `
//       <h3>📩 New Contact Enquiry</h3>
//       <p><b>Name:</b> ${name}</p>
//       <p><b>Email:</b> ${email}</p>
//       <p><b>Phone:</b> ${phone}</p>
//       <p><b>Message:</b><br/>${message}</p>
//       <hr />
//       <small>This message was sent from the SKC Catering website contact form.</small>
//     `
//   });
// };
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // IMPORTANT
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // 🔥 VERIFY CONNECTION
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ SMTP VERIFY FAILED:", error);
//   } else {
//     console.log("✅ SMTP SERVER READY");
//   }
// });

// export const sendContactMail = async ({ name, email, phone, subject, message }) => {
//   return await transporter.sendMail({
//     from: `"SKC Catering Website" <${process.env.EMAIL_USER}>`,
//     to: process.env.EMAIL_USER,
//     subject: `New Enquiry: ${subject}`,
//     html: `
//       <h3>📩 New Contact Enquiry</h3>
//       <p><b>Name:</b> ${name}</p>
//       <p><b>Email:</b> ${email}</p>
//       <p><b>Phone:</b> ${phone}</p>
//       <p><b>Message:</b><br/>${message}</p>
//     `
//   });
// };
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendContactMail = async ({ name, email, phone, subject, message }) => {
  return await sgMail.send({
    to: process.env.EMAIL_USER,
    from: process.env.EMAIL_USER, // verified sender
    subject: `New Enquiry: ${subject}`,
    html: `
      <h3>📩 New Contact Enquiry</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b><br/>${message}</p>
    `
  });
};
