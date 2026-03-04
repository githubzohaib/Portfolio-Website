const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
const contactRoutes = require('./routes/contactRoutes');

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Enable CORS only for your frontend origin
const corsOptions = {
    origin: [
        'https://portfolio-zohaibali.vercel.app',
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Routes
app.use('/api/contact', contactRoutes);

app.use('/', (req, res) => {
    res.send('server is working');
});

// Start the server
// app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
// });

module.exports = app;