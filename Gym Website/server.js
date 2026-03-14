const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// STATIC FILES SERVING
// ======================

// Serve all static files from frontend/public (images, fonts, etc)
app.use('/public', express.static(path.join(__dirname, 'frontend/public')));

// Serve all static files from frontend/src (css, js, components)
app.use('/css', express.static(path.join(__dirname, 'frontend/src/css')));
app.use('/js', express.static(path.join(__dirname, 'frontend/src/js')));
app.use('/images', express.static(path.join(__dirname, 'frontend/public/images')));
app.use('/components', express.static(path.join(__dirname, 'frontend/src/components')));

// Fallback: Serve any other static files from frontend/src
app.use(express.static(path.join(__dirname, 'frontend/src')));

// ======================
// API ROUTES
// ======================

// User Login API
app.post('/api/login', async (req, res) => {
  try {
    const { usernameOrEmail, password, role } = req.body;
    
    if (!usernameOrEmail || !password || !role) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const connection = await db.getConnection();
    
    // Try login with username first, then with email
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE (username = ? OR LOWER(email) = ?) AND password = ? AND role = ?',
      [usernameOrEmail, usernameOrEmail.toLowerCase(), password, role]
    );
    connection.release();

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful', user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// User Signup API
app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;
    // Force role to 'user' - admin accounts cannot be created through signup
    const role = 'user';
    
    // Validate required fields
    if (!fullName || !email || !username || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const connection = await db.getConnection();
    
    // Check if user already exists (by username)
    const [existingUser] = await connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (existingUser.length > 0) {
      connection.release();
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    // Check if email already exists
    const [existingEmail] = await connection.query(
      'SELECT * FROM users WHERE LOWER(email) = ?',
      [normalizedEmail]
    );

    if (existingEmail.length > 0) {
      connection.release();
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Insert new user with email (stored in lowercase)
    await connection.query(
      'INSERT INTO users (fullName, email, username, password, role) VALUES (?, ?, ?, ?, ?)',
      [fullName, normalizedEmail, username, password, role]
    );
    connection.release();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// Get all users API
app.get('/api/users', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [users] = await connection.query('SELECT id, fullName, username, role FROM users');
    connection.release();
    res.json({ success: true, users });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// ======================
// PAGE ROUTES
// ======================

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/src/pages/index.html'));
});

// Route for log-in page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/src/pages/log-in.html'));
});

// Route for signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/src/pages/signup.html'));
});

// Route for admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/src/pages/admin_dashboard.html'));
});

// Route for medicinal plants page
app.get('/plants', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/src/pages/medicinal_plants.html'));
});

// Route for proteins & vitamins page (Diet)
app.get('/diet', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/src/pages/proteins_vitamins.html'));
});

app.get('/nutrition', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/src/pages/proteins_vitamins.html'));
});

// Route for payment page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/src/pages/payment.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'frontend/src/pages/index.html'));
});

// Start server
const os = require('os');

// Get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🏋️  GYM WEBSITE SERVER');
  console.log('='.repeat(60));
  console.log(`✅ Server is running on port ${PORT}`);
  console.log('\n📱 Access URLs:');
  console.log(`  • Local:     http://localhost:${PORT}`);
  console.log(`  • Network:   http://${localIP}:${PORT}`);
  console.log('\n📁 Static Files:');
  console.log(`  • Images:    /images/`);
  console.log(`  • CSS:       /css/`);
  console.log(`  • JS:        /js/`);
  console.log(`  • Public:    /public/`);
  console.log('\n💾 Database:');
  console.log(`  • Host:      ${process.env.DB_HOST || 'localhost'}`);
  console.log(`  • Database:  ${process.env.DB_NAME || 'gym_db'}`);
  console.log('='.repeat(60));
  console.log('Press Ctrl+C to stop the server\n');
});
