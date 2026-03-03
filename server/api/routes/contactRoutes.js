// api/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { handleContact } = require("../controllers/contactController"); // ✅ correct

router.post("/", handleContact); // ✅ must match exported function

module.exports = router;