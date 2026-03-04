const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const contactRoutes = require("../routes/contactRoutes");
const cors = require("cors");
const serverless = require("serverless-http");

dotenv.config();

const app = express();
app.use(cors({
  origin: ["https://portfolio-zohaibali.vercel.app", "http://localhost:5173"],
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());
app.use("/api/contact", contactRoutes);

const handler = async (req, res) => {
  await connectDB(); // ensures DB is connected per cold start
  return app(req, res);
};

module.exports.handler = serverless(handler);

// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const contactRoutes = require("./routes/contactRoutes");
// const cors = require("cors");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors()); // ✅ ADD THIS
// app.use(express.json());

// app.use("/api/contact", contactRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));