// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'havnet_secret_key_123'; // In production, use .env

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- MONGODB CONNECTION ---
// UPDATED: Changed database name from 'hav-net' to 'havnet_db'
mongoose.connect('mongodb://localhost:27017/havnet_db') 
.then(() => console.log('✅ Connected to MongoDB: havnet_db'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- USER SCHEMA ---
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// --- ROUTES ---

// 1. SIGNUP API
app.post('/api/signup', async (req, res) => {
    try {
        const { fullName, contactNumber, email, password } = req.body;

        // Basic Validation
        if (!fullName || !contactNumber || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create New User
        const newUser = new User({
            fullName,
            contactNumber,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'Account created successfully.' });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: 'Server error occurred.' });
    }
});

// 2. LOGIN API
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate Token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '12h' });

        res.json({ 
            message: 'Login successful', 
            token,
            user: { fullName: user.fullName, email: user.email } 
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: 'Server error occurred.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});