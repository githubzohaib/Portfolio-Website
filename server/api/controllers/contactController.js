// api/controllers/contactController.js
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const handleContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to MongoDB
    const contact = await Contact.create({ name, email, message });

    // Send email notification
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { handleContact };