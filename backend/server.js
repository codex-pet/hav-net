// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'havnet_secret_key_123';

app.use(cors());
app.use(express.json());

// --- MONGODB ---
mongoose.connect('mongodb://localhost:27017/havnet_db')
    .then(() => console.log('✅ Connected to MongoDB: havnet_db'))
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
    date: { type: String, required: true },       // e.g., "Oct 28, 2025"
    startTime: { type: String, required: true },  // e.g., "14:30"
    duration: { type: String, required: true },   // e.g., "15 minutes"
    status: { type: String, required: true },     // e.g., "Completed"
    detectionsCount: { type: Number, default: 0 },
    detectedItems: [String] // Array of strings e.g., ["Human", "Vehicle"]
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

// --- HISTORY ROUTES (NEW) ---

// 1. Save a new Session
app.post('/api/history', authenticateToken, async (req, res) => {
    try {
        const { date, startTime, duration, status, detectionsCount, detectedItems } = req.body;

        const newSession = new Session({
            userId: req.user.id,
            date,
            startTime,
            duration,
            status,
            detectionsCount,
            detectedItems
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
        // Find sessions for this user, sort by newest first (reverse natural order roughly)
        const sessions = await Session.find({ userId: req.user.id }).sort({ _id: -1 });
        res.json(sessions);
    } catch (err) {
        console.error("Fetch History Error:", err);
        res.status(500).json({ message: 'Failed to fetch history.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});