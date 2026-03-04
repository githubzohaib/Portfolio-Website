// // testEmail.js
// const nodemailer = require("nodemailer");

// async function sendTestEmail() {
//   try {
//     // Create transporter
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465, // SSL port
//       secure: true, // must be true for 465
//       auth: {
//         user: "zohaibaliwork@gmail.com", // your Gmail
//         pass: "uzojebequoyjspxh",        // your App Password
//       },
//     });

//     // Test email
//     const info = await transporter.sendMail({
//       from: '"Test Email" <zohaibaliwork@gmail.com>',
//       to: "zohaibaliwork@gmail.com", // you can also put any other email
//       subject: "🚀 Test Email from Node.js",
//       text: "Hello! This is a test email from Node.js",
//     });

//     console.log("✅ Email sent successfully!");
//     console.log("Message ID:", info.messageId);
//   } catch (err) {
//     console.error("❌ Contact error:", err);
//   }
// }

// // Run the test
// sendTestEmail();