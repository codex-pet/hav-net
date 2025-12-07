// backend/server.js
require('dotenv').config(); // <--- LOADS .ENV VARIABLES

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// --- CONFIGURATION ---
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET; // Taken from .env
const MONGODB_URI = process.env.MONGODB_URI; // Taken from .env

// Safety Check
if (!SECRET_KEY) {
    console.error("❌ FATAL ERROR: JWT_SECRET is not defined in .env");
    process.exit(1);
}

app.use(cors());
app.use(express.json());

// --- MONGODB ---
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- SCHEMAS ---
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const SessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    duration: { type: String, required: true },
    status: { type: String, required: true },
    detectionsCount: { type: Number, default: 0 },
    detectedItems: [String], 
    // NEW FIELDS
    overallConfidence: { type: Number, default: 0 }, 
    classStats: [{ 
        className: String, 
        count: Number, 
        avgConfidence: Number 
    }]
});

const User = mongoose.model('User', UserSchema);
const Session = mongoose.model('Session', SessionSchema);

// --- MIDDLEWARE: VERIFY TOKEN ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ message: 'Access denied. Token missing.' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
};

// --- AUTH ROUTES ---
app.post('/api/signup', async (req, res) => {
    try {
        const { fullName, contactNumber, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, contactNumber, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Account created successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '12h' });
        res.json({ message: 'Login successful', token, user: { fullName: user.fullName, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// --- HISTORY ROUTES ---

// 1. Save a new Session
app.post('/api/history', authenticateToken, async (req, res) => {
    try {
        const { 
            date, startTime, duration, status, 
            detectionsCount, detectedItems, 
            overallConfidence, classStats 
        } = req.body;

        const newSession = new Session({
            userId: req.user.id,
            date,
            startTime,
            duration,
            status,
            detectionsCount,
            detectedItems,
            overallConfidence,
            classStats
        });

        await newSession.save();
        res.status(201).json({ message: 'Session saved successfully.' });
    } catch (err) {
        console.error("Save History Error:", err);
        res.status(500).json({ message: 'Failed to save session.' });
    }
});

// 2. Get User History
app.get('/api/history', authenticateToken, async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user.id }).sort({ _id: -1 });
        res.json(sessions);
    } catch (err) {
        console.error("Fetch History Error:", err);
        res.status(500).json({ message: 'Failed to fetch history.' });
    }
});

app.get('/api/user', authenticateToken, async (req, res) => {
    try {
        // Find user by ID (from the token) but exclude the password
        const user = await User.findById(req.user.id).select('email fullName contactNumber');
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});