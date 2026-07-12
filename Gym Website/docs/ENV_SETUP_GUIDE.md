# .env Configuration Guide for Gym Website Project

## Overview
The `.env` file stores environment-specific configuration variables for your Node.js Express Gym Website project. This file should NOT be committed to version control for security reasons.

---

## File Location
```
Gym Website/
├── .env                    ← Your configuration file
├── .gitignore             ← Already excludes .env
├── server.js
├── config/
│   └── database.js
└── ...
```

---

## Complete .env File (Local Development)

```env
# =====================================
# SERVER CONFIGURATION
# =====================================
PORT=3000
NODE_ENV=development

# =====================================
# MYSQL DATABASE CONFIGURATION
# =====================================
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=gym_db
DB_PORT=3306
```

---

## Environment Variables Explained

### Server Configuration

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `3000` | The port where your Express server runs |
| `NODE_ENV` | `development` | Environment mode (development/production) |

### MySQL Database Configuration

| Variable | Value | Description |
|----------|-------|-------------|
| `DB_HOST` | `localhost` | MySQL server hostname or IP address |
| `DB_USER` | `root` | MySQL database user (default root user) |
| `DB_PASSWORD` | (empty) | MySQL password (leave empty if no password set) |
| `DB_NAME` | `gym_db` | Name of the database to use |
| `DB_PORT` | `3306` | MySQL server port (default: 3306) |

---

## Configuration Examples

### Example 1: Local Development (No MySQL Password)
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=gym_db
DB_PORT=3306
```

### Example 2: Local Development (With MySQL Password)
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_secure_password_here
DB_NAME=gym_db
DB_PORT=3306
```

### Example 3: Remote MySQL Server
```env
PORT=3000
NODE_ENV=development

DB_HOST=192.168.1.100
DB_USER=gym_admin
DB_PASSWORD=secure_password123
DB_NAME=gym_db
DB_PORT=3306
```

### Example 4: Production Environment
```env
PORT=8080
NODE_ENV=production

DB_HOST=production-db.example.com
DB_USER=prod_user
DB_PASSWORD=production_secure_password
DB_NAME=gym_db_prod
DB_PORT=3306
```

---

## How to Use .env in Your Code

### In server.js or any Node.js file:
```javascript
require('dotenv').config();

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

console.log(`Server running on port ${PORT}`);
console.log(`Connected to database: ${DB_NAME}`);
```

### In database.js (Connection Pool):
```javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

---

## MySQL Setup with gym_db Database

### Step 1: Login to MySQL
```bash
mysql -u root -p
# Enter password (or press Enter if no password)
```

### Step 2: Create Database
```sql
CREATE DATABASE IF NOT EXISTS gym_db;
USE gym_db;
```

### Step 3: Create Tables
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  role ENUM('admin', 'user', 'staff') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE memberships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  membership_type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price DECIMAL(10, 2),
  status ENUM('active', 'inactive', 'expired') DEFAULT 'active',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Step 4: Verify Setup
```sql
SHOW DATABASES;  -- Should show gym_db
USE gym_db;
SHOW TABLES;     -- Should show users, memberships, payments
```

---

## Step-by-Step: Setting Up Your Environment

### 1. Update .env File
Edit your `.env` file with your MySQL credentials:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=gym_db
DB_PORT=3306
```

### 2. Verify MySQL is Running
```bash
# Windows - Check Services
Get-Service | Where-Object {$_.Name -like "*MySQL*"}

# Mac - Check Homebrew MySQL
brew services list

# Linux - Check systemctl
sudo systemctl status mysql
```

### 3. Create the Database
```bash
mysql -u root -p < database/gym_website.sql
```

### 4. Test Configuration
```bash
npm start
```

You should see:
```
✅ MySQL Database Connected Successfully!
📊 Database: gym_db
🖥️  Host: localhost
🏋️  Gym Website Server is running on http://localhost:3000
```

---

## Troubleshooting

### Issue: "Access denied for user 'root'@'localhost'"
**Cause**: Wrong password in .env

**Solution**: 
1. Check your MySQL password is correct
2. Update `.env` with correct password
3. Restart server: `npm start`

### Issue: "Unknown database 'gym_db'"
**Cause**: Database not created yet

**Solution**:
```bash
mysql -u root -p -e "CREATE DATABASE gym_db;"
```

### Issue: "Cannot connect to MySQL on 'localhost:3306'"
**Cause**: MySQL server not running

**Solution**:
- Windows: Start MySQL from Services
- Mac: `brew services start mysql`
- Linux: `sudo systemctl start mysql`

### Issue: Server starts but can't connect to database
**Solution**: Verify all .env variables match your MySQL setup:
```bash
# Test MySQL connection manually
mysql -h localhost -u root -p gym_db
```

---

## Security Best Practices

### ✅ DO:
- Use `.env` file for sensitive data
- Add `.env` to `.gitignore` (already done)
- Use strong passwords for production
- Change default MySQL password if using root
- Rotate passwords regularly
- Use environment variables for all secrets

### ❌ DON'T:
- Commit `.env` file to Git
- Hardcode credentials in code
- Use same credentials everywhere
- Leave default MySQL password
- Share `.env` file publicly
- Use simple/weak passwords

### Example .gitignore Entry (Already Configured):
```
# Environment variables
.env
.env.local
.env.*.local

# Node modules
node_modules/

# Build/dist files
build/
dist/

# Logs
*.log
npm-debug.log*
```

---

## Managing Multiple Environments

### Development (.env)
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=local_password
DB_NAME=gym_db
```

### Production (.env.production)
```env
NODE_ENV=production
PORT=8080
DB_HOST=prod-db.aws.amazon.com
DB_USER=prod_user
DB_PASSWORD=super_secure_password
DB_NAME=gym_db_prod
```

### Load by Environment:
```bash
# Development
npm start

# Production
NODE_ENV=production npm start
```

---

## Current .env Configuration

Your `.env` file is now configured with:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=gym_db
DB_PORT=3306
```

**Note:** The `DB_PASSWORD` is empty. If your MySQL root user has a password, update it:
```env
DB_PASSWORD=your_mysql_root_password
```

---

## Ready to Start!

Once you've:
1. ✅ Updated `.env` with your MySQL credentials
2. ✅ Created the `gym_db` database
3. ✅ Started MySQL server

Run:
```bash
npm start
```

Your Gym Website backend is ready! 🚀

---

## Additional Resources

- [Dotenv Package Documentation](https://github.com/motdotla/dotenv)
- [Node.js process.env](https://nodejs.org/api/process.html#process_process_env)
- [Environment Variables Best Practices](https://12factor.net/config)
- [MySQL Documentation](https://dev.mysql.com/doc/)
