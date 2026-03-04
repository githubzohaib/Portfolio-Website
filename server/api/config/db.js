const mongoose = require("mongoose");

let isConnected; // track connection across invocations

const connectDB = async () => {
  if (isConnected) {
    // Use existing connection
    return Promise.resolve();
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connection.readyState;

    if (!isConnected) {
      console.log("MongoDB connected");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err; // important for serverless
  }
};

module.exports = connectDB;