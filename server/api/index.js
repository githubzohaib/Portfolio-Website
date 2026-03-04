const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const cors = require("cors");
const serverless = require("serverless-http");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);

// ✅ Export as serverless handler
module.exports.handler = serverless(app);

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