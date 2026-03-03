require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async function sendEmail({ to, subject, text }) {
  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });

  console.log("Email sent:", info.response);
};