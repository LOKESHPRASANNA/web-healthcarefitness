# MySQL Integration Guide for Gym Website

## Overview
Your Gym Website is now configured with MySQL as a global database host. This guide walks you through setting up and using the database.

## Prerequisites
- **MySQL Server** installed and running (Version 5.7 or higher)
  - [Download MySQL](https://dev.mysql.com/downloads/mysql/)
- **Node.js** and **npm** (already installed)

## Installation & Setup

### Step 1: Install MySQL Server
1. Download and install MySQL from [mysql.com](https://dev.mysql.com/downloads/mysql/)
2. During installation, remember:
   - **Root password** (you'll need this)
   - **Port** (default: 3306)
3. Start the MySQL service:
   - **Windows**: MySQL should start automatically or via Services
   - **Mac**: `brew services start mysql`
   - **Linux**: `sudo systemctl start mysql`

### Step 2: Create Database & Tables
1. Open **MySQL Command Line Client** or **MySQL Workbench**
2. Login with your root credentials:
   ```bash
   mysql -u root -p
   ```
3. Run the database setup script:
   ```bash
   source database/gym_website.sql;
   ```
   OR copy-paste the contents of `database/gym_website.sql` in your MySQL client

4. Verify tables were created:
   ```sql
   USE gym_website;
   SHOW TABLES;
   ```

### Step 3: Configure .env File
Edit the `.env` file in your project root with your MySQL credentials:

```env
PORT=3000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=gym_website
DB_PORT=3306
```

**Important:** Replace `your_password_here` with your MySQL root password.

### Step 4: Start Your Application
```bash
npm start
```

You should see:
```
✅ MySQL Database Connected Successfully!
📊 Database: gym_website
🖥️  Host: localhost
🏋️  Gym Website Server is running on http://localhost:3000
```

---

## Database Structure

### Tables Created

#### **users**
Stores all user accounts (members, staff, admins)
```sql
- id (Primary Key)
- fullName
- username (Unique)
- password
- email
- role (admin, user, staff)
- created_at
- updated_at
```

#### **memberships**
Tracks gym memberships and subscriptions
```sql
- id (Primary Key)
- user_id (Foreign Key)
- membership_type (e.g., "Gold", "Silver", "Bronze")
- start_date
- end_date
- price
- status (active, inactive, expired)
- created_at
```

#### **nutrition_plans**
Pre-defined diet and nutrition plans
```sql
- id (Primary Key)
- name
- description
- protein (grams)
- carbs (grams)
- fats (grams)
- calories
- created_at
```

#### **payments**
Payment records for memberships
```sql
- id (Primary Key)
- user_id (Foreign Key)
- membership_id (Foreign Key)
- amount
- payment_method (credit_card, paypal, etc)
- status (pending, completed, failed)
- payment_date
```

---

## API Endpoints

### Authentication Endpoints

#### **POST /api/login**
Login a user
```javascript
Request:
{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}

Response (Success):
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "fullName": "Admin User",
    "username": "admin",
    "role": "admin"
  }
}

Response (Error):
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### **POST /api/signup**
Register a new user
```javascript
Request:
{
  "fullName": "John Doe",
  "username": "johndoe",
  "password": "password123",
  "role": "user"
}

Response (Success):
{
  "success": true,
  "message": "User registered successfully"
}

Response (Error):
{
  "success": false,
  "message": "Username already exists"
}
```

#### **GET /api/users**
Get all users (currently no authentication required)
```javascript
Response:
{
  "success": true,
  "users": [
    {
      "id": 1,
      "fullName": "Admin User",
      "username": "admin",
      "role": "admin"
    }
  ]
}
```

---

## Using the Global Database Connection

### In Your Code
To use the database globally in any file:

```javascript
const db = require('./config/database');

// Example: Get all users
async function getAllUsers() {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.query('SELECT * FROM users');
    connection.release();
    return rows;
  } catch (err) {
    console.error('Error:', err);
  }
}

// Example: Insert data
async function createUser(fullName, username, password, role) {
  try {
    const connection = await db.getConnection();
    await connection.query(
      'INSERT INTO users (fullName, username, password, role) VALUES (?, ?, ?, ?)',
      [fullName, username, password, role]
    );
    connection.release();
  } catch (err) {
    console.error('Error:', err);
  }
}
```

---

## Testing the Database Connection

### Test 1: Check if Server Connects
When you run `npm start`, you should see:
```
✅ MySQL Database Connected Successfully!
```

### Test 2: Test API Using Postman or cURL
```bash
# Test login API
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123","role":"admin"}'

# Test signup API
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","username":"testuser","password":"pass123","role":"user"}'

# Get all users
curl http://localhost:3000/api/users
```

---

## Troubleshooting

### Error: "MySQL Connection Error: Access denied for user 'root'"
**Solution:** Check your MySQL password in the `.env` file. Make sure it's correct.

### Error: "Unknown database 'gym_website'"
**Solution:** Run the SQL script again to create the database:
```sql
mysql -u root -p < database/gym_website.sql
```

### Error: "ECONNREFUSED - Connection refused"
**Solution:** 
1. Make sure MySQL Server is running
2. Check if MySQL is on a different host/port (update `.env`)
3. On Windows: Check Services.msc for MySQL service status
4. On Mac: Run `brew services restart mysql`

### Error: "listen EADDRINUSE: address already in use :::3000"
**Solution:** Change the PORT in `.env` or kill the existing process:
```bash
# Windows
Get-Process node | Stop-Process -Force

# Mac/Linux
pkill -f node
```

---

## Next Steps

1. **Update Frontend Forms** to send data to API endpoints
2. **Add Authentication** - Use JWT tokens for secure authentication
3. **Add Validation** - Validate user input before database operations
4. **Add Hashing** - Use bcrypt to hash passwords before storing
5. **Create More Endpoints** - For memberships, nutrition plans, payments, etc.

## Example: Update Login Form to Use Database API

Modify `frontend/src/js/log-in.js`:
```javascript
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect based on role
            if (role === 'admin') window.location.href = '/admin';
            else window.location.href = '/';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Check console for details.');
    }
});
```

---

## Security Notes ⚠️

- **Never** hardcode passwords in your code
- Use environment variables (`.env`) for sensitive data
- Add password hashing (use `bcrypt` package)
- Implement JWT authentication for secure API access
- Validate and sanitize all user inputs
- Use prepared statements to prevent SQL injection

---

## Support & Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Node.js MySQL2 Package](https://github.com/sidorares/node-mysql2)
- [Express.js Guide](https://expressjs.com/)

---

**Happy coding! 🏋️💪**
