const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/driver');

const app = express();
const PORT = process.env.PORT || 9000;

const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Define routes after middleware
app.use('/api/auth', authRoute);
app.use('/api/driver', postRoute);

// Connect to MongoDB and start the server
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.r8psb.mongodb.net/yourDatabaseName?retryWrites=true&w=majority');
        console.log('MongoDB connected');
    } catch (err) {
        console.error("Error connecting to the database: " + err);
        process.exit(1); // Exit the process with failure
    }
};

app.listen(PORT, async () => {
    await connectDB(); // Ensure DB connection before starting the server
    console.log("Server is running on port " + PORT);
});