# Email Auto-Capitalize Feature Guide

## Overview
Your signup form now has an email field that automatically capitalizes the first letter as the user types in real-time.

---

## What Was Added

### 1. Email Input Field in signup.html

```html
<input type="email" id="email" placeholder="Email Address" required>
```

**Location:** Placed after the Full Name field in the signup form

**Features:**
- HTML5 email validation
- Placeholder text: "Email Address"
- Required field
- Real-time capitalization of first character

---

## How It Works

### JavaScript Implementation

The `signup.js` file now includes:

```javascript
// Email field - Capitalize first letter in real-time
const emailInput = document.getElementById('email');

emailInput.addEventListener('input', function(event) {
    let emailValue = this.value;
    
    // If email has at least one character
    if (emailValue.length > 0) {
        // Capitalize the first character, keep the rest as-is
        const firstChar = emailValue.charAt(0).toUpperCase();
        const restOfEmail = emailValue.slice(1);
        this.value = firstChar + restOfEmail;
    }
});
```

### How It Works Step-by-Step:

1. **Listen for Input Event**: The script listens to every keystroke in the email field
2. **Get Current Value**: Captures the current email text
3. **Extract First Character**: Gets the first character using `charAt(0)`
4. **Capitalize First Char**: Converts it to uppercase with `toUpperCase()`
5. **Get Rest of Email**: Gets everything after the first character using `slice(1)`
6. **Update Field**: Combines the uppercase first character with the rest

---

## Examples

### Example 1: User Types Normally
```
User types:  a
Field shows: A

User types:  abc@email.com
Field shows: Abc@email.com

User types:  john.smith@gmail.com
Field shows: John.smith@gmail.com
```

### Example 2: User Types Uppercase Letter
```
User types:  Abc@email.com
Field shows: Abc@email.com  (stays the same - already capitalized)
```

### Example 3: User Types Numbers First
```
User types:  123sendpaycheck@example.com
Field shows: 123sendpaycheck@example.com
(Numbers don't get capitalized - only letters)
```

---

## Features of the Updated Form

### Email Field Features ✅
- Automatic first-letter capitalization
- Real-time as user types
- HTML5 email type validation
- Required field
- Rest of email stays unchanged
- Works with special characters (@, ., -)

### Form Validation ✅
The signup form now includes:
- Full Name validation (required)
- Email validation (required + format check)
- Username validation (required)
- Password validation (required)
- Role selection (required)

### Email Format Validation ✅
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Checks for: name@domain.extension format
```

---

## Updated Signup Form HTML

Full signup form with email field:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gym Website Sign Up</title>
    <link rel="stylesheet" href="../css/signup.css">
</head>
<body>
    <div class="signup-container">
        <h2>Sign Up</h2>
        <form id="signupForm">
            <!-- Full Name Field -->
            <input type="text" id="fullName" placeholder="Full Name" required>
            
            <!-- Email Field - Auto Capitalizes First Letter -->
            <input type="email" id="email" placeholder="Email Address" required>
            
            <!-- Username Field -->
            <input type="text" id="username" placeholder="Username" required>
            
            <!-- Password Field -->
            <input type="password" id="password" placeholder="Password" required>
            
            <!-- Role Selection -->
            <select id="role">
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="staff">Staff</option>
            </select>
            
            <!-- Submit Button -->
            <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
    </div>

    <script src="../js/signup.js"></script>
</body>
</html>
```

---

## Updated JavaScript Code (signup.js)

```javascript
// ==========================================
// EMAIL AUTO-CAPITALIZE FEATURE
// ==========================================

// Email field - Capitalize first letter in real-time
const emailInput = document.getElementById('email');

emailInput.addEventListener('input', function(event) {
    let emailValue = this.value;
    
    // If email has at least one character
    if (emailValue.length > 0) {
        // Capitalize the first character, keep the rest as-is
        const firstChar = emailValue.charAt(0).toUpperCase();
        const restOfEmail = emailValue.slice(1);
        this.value = firstChar + restOfEmail;
    }
});

// ==========================================
// SIGNUP FORM SUBMISSION
// ==========================================

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form values
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    // Validation: Check if all fields are filled
    if (!fullName || !email || !username || !password || !role) {
        alert("Please fill in all fields!");
        return;
    }

    // Validation: Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    // Log form data (for demonstration)
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Role:", role);

    // Send data to backend API
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            username: username,
            password: password,
            role: role
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Sign up successful! Redirecting to login...");
            window.location.href = "/login";
        } else {
            alert(data.message || "Sign up failed. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});
```

---

## How to Test

### Test on Your Computer:

1. **Start server:**
   ```bash
   npm start
   ```

2. **Open signup page:**
   ```
   http://localhost:3000/signup
   ```

3. **Test email field:**
   - Type in email field slowly: `a` → shows `A`
   - Continue typing: `Abc@email.com`
   - Clear and try again: `john.doe@gmail.com` → shows `John.doe@gmail.com`
   - Try starting with numbers: `123test@example.com` → shows `123test@example.com`

4. **Check browser console:**
   - Open DevTools (F12)
   - Check Console tab for logged values
   - Verify email is capitalized

---

## Customization Options

### Option 1: Capitalize All Letters
```javascript
emailInput.addEventListener('input', function(event) {
    this.value = this.value.toUpperCase();
});
```

### Option 2: Title Case (Capitalize Each Word)
```javascript
emailInput.addEventListener('input', function(event) {
    this.value = this.value.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
});
```

### Option 3: No Automatic Change (Just Validation)
```javascript
emailInput.addEventListener('input', function(event) {
    // Only validate, don't modify
    const emailRegex = /^[^\s@]*@?[^\s@]*\.?[^\s@]*$/;
    if (!emailRegex.test(this.value)) {
        this.style.borderColor = 'red';
    } else {
        this.style.borderColor = 'green';
    }
});
```

---

## Browser Compatibility

✅ Works on:
- Chrome/Chromium
- Firefox
- Safari
- Edge
- Opera
- Mobile browsers

✅ No external libraries needed - uses native JavaScript

---

## Database Integration

When the form is submitted, the email data is sent to your backend:

```javascript
fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        fullName: fullName,
        email: email,          // ← Capitalized email (e.g., "Abc@email.com")
        username: username,
        password: password,
        role: role
    })
})
```

**Note:** The backend `server.js` needs to have the email field in the database schema:

```javascript
// In config/database.js or when creating the users table:
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100),          // ← Add this field if not present
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user', 'staff') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Troubleshooting

### Email Not Capitalizing?
**Solution:**
1. Check browser console (F12) for errors
2. Verify email input has `id="email"`
3. Ensure `signup.js` is loading (check Network tab)
4. Clear browser cache and refresh (Ctrl+Shift+Delete, then F5)

### Email Field Not Visible?
**Solution:**
1. Verify `signup.html` has the email input line
2. Check CSS file (`signup.css`) for styling
3. Check browser DevTools (F12) → Elements tab

### Form Not Submitting?
**Solution:**
1. Check all required fields are filled
2. Check email format is valid (has @ and .)
3. Check browser console for JS errors
4. Verify `/api/signup` endpoint exists in `server.js`

---

## Summary

✅ **Email field added** to signup form  
✅ **Auto-capitalization implemented** - first letter becomes uppercase  
✅ **Real-time formatting** - happens as user types  
✅ **Email validation** - checks format before submission  
✅ **Form validation** - all fields required  
✅ **Database ready** - sends capitalized email to backend  

Your signup form is now complete with professional email handling! 🎉

---

## Quick Reference

| Feature | Status | Location |
|---------|--------|----------|
| Email Input Field | ✅ Added | `frontend/src/pages/signup.html` |
| Auto-Capitalize Logic | ✅ Added | `frontend/src/js/signup.js` (lines 1-14) |
| Email Validation | ✅ Added | `frontend/src/js/signup.js` (lines 31-35) |
| Form Submission | ✅ Updated | `frontend/src/js/signup.js` (lines 16-56) |
| Database Schema | ⏳ Needed | Update `database/gym_website.sql` with email field |

**Next Step:** Update your database users table to include the email field (if not already present)!
