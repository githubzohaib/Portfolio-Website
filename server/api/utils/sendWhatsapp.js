// const twilio = require("twilio");

// const sendWhatsApp = async (contact) => {
//   const client = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
//   );

//   await client.messages.create({
//     body: `New Contact Message:
// Name: ${contact.name}
// Email: ${contact.email}
// Message: ${contact.message}`,
//     from: process.env.TWILIO_WHATSAPP_FROM,
//     to: process.env.TWILIO_WHATSAPP_TO,
//   });
// };

// module.exports = sendWhatsApp;