# Email Auto-Capitalize - Code Reference

## Quick Copy-Paste Code

### Option 1: Using Just the JavaScript (Minimal)

**In your HTML form:**
```html
<input type="email" id="email" placeholder="Email Address" required>
```

**In your JavaScript file:**
```javascript
document.getElementById('email').addEventListener('input', function() {
    if (this.value.length > 0) {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    }
});
```

---

### Option 2: With Full Form Validation (Recommended)

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Sign Up</title>
    <link rel="stylesheet" href="signup.css">
</head>
<body>
    <form id="signupForm">
        <input type="text" id="fullName" placeholder="Full Name" required>
        <input type="email" id="email" placeholder="Email Address" required>
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit">Sign Up</button>
    </form>
    <script src="signup.js"></script>
</body>
</html>
```

**JavaScript:**
```javascript
// Auto-capitalize email field
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    }
});

// Form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    
    // Send to server
    fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            alert('Success!');
            window.location.href = '/login';
        } else {
            alert(data.message);
        }
    });
});
```

---

## Different Capitalization Options

### Capitalize First Letter Only (Default)
```javascript
emailInput.addEventListener('input', function() {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});
```
**Result:** `abc@email.com` → `Abc@email.com`

### Capitalize All Letters
```javascript
emailInput.addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});
```
**Result:** `abc@email.com` → `ABC@EMAIL.COM`

### Title Case (Every Word Start)
```javascript
emailInput.addEventListener('input', function() {
    this.value = this.value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
});
```
**Result:** `john smith` → `John Smith`

### Capitalize After @ Symbol
```javascript
emailInput.addEventListener('input', function() {
    let email = this.value;
    if (email.includes('@')) {
        let parts = email.split('@');
        this.value = parts[0].charAt(0).toUpperCase() + 
                     parts[0].slice(1) + '@' + 
                     parts[1].charAt(0).toUpperCase() + 
                     parts[1].slice(1);
    }
});
```
**Result:** `abc@def.com` → `Abc@Def.com`

---

## Real-World Examples

### Example 1: Shopping Cart Checkout
```html
<input type="email" id="receipt-email" placeholder="Email for receipt">
```

```javascript
document.getElementById('receipt-email').addEventListener('input', function() {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});
```

### Example 2: Contact Form
```html
<form>
    <input type="text" id="contact-name" placeholder="Name">
    <input type="email" id="contact-email" placeholder="Email">
    <textarea id="contact-message"></textarea>
    <button type="submit">Send</button>
</form>
```

```javascript
const emailField = document.getElementById('contact-email');
emailField.addEventListener('input', function() {
    if (this.value) {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    }
});
```

### Example 3: Multiple Form Fields
```html
<input type="email" id="work-email" placeholder="Work Email">
<input type="email" id="personal-email" placeholder="Personal Email">
```

```javascript
['work-email', 'personal-email'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    });
});
```

---

## Testing Code

### Unit Test
```javascript
function testEmailCapitalize(input, expected) {
    let value = input;
    if (value.length > 0) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value === expected ? '✅ PASS' : '❌ FAIL';
}

// Run tests
console.log(testEmailCapitalize('abc@test.com', 'Abc@test.com'));  // ✅
console.log(testEmailCapitalize('john.doe@gmail.com', 'John.doe@gmail.com'));  // ✅
console.log(testEmailCapitalize('123@example.com', '123@example.com'));  // ✅
console.log(testEmailCapitalize('', ''));  // ✅
```

### Browser Console Test
```javascript
// Paste in browser console (F12)
const email = document.getElementById('email');
email.addEventListener('input', function() {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

// Now test by typing in the email field!
```

---

## Validation Examples

### Basic Email Validation
```javascript
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Test
isValidEmail('test@example.com');      // true
isValidEmail('invalid.email');         // false
isValidEmail('user@domain');           // false
isValidEmail('multiple@@domain.com');  // false
```

### Complete Form with Validation
```javascript
const form = document.getElementById('signupForm');
const emailInput = document.getElementById('email');

// Auto-capitalize
emailInput.addEventListener('input', function() {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return;
    }
    
    // Submit form
    console.log('Form submitted with email:', email);
});
```

---

## CSS Styling Ideas

### Style Email Input While Typing
```css
#email {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
}

#email:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

/* Highlight on error */
#email.error {
    border-color: #f44336;
}
```

### Show Real-Time Validation
```css
#email.valid {
    border-color: #4CAF50;
    background-color: #f1f8f4;
}

#email.invalid {
    border-color: #f44336;
    background-color: #fef5f5;
}
```

**JavaScript:**
```javascript
emailInput.addEventListener('input', function() {
    // Auto-capitalize
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    
    // Real-time validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.value)) {
        this.classList.remove('invalid');
        this.classList.add('valid');
    } else {
        this.classList.remove('valid');
        this.classList.add('invalid');
    }
});
```

---

## Performance Tips

### Debounce for Heavy Processing
```javascript
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const emailInput = document.getElementById('email');
const handleInput = debounce(function() {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    console.log('Email:', this.value);
}, 300);

emailInput.addEventListener('input', handleInput);
```

### Optimize Regex
```javascript
// Bad: Creates new regex on every keystroke
emailInput.addEventListener('input', function() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(this.value)) {...}
});

// Good: Define regex once
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailInput.addEventListener('input', function() {
    if (emailRegex.test(this.value)) {...}
});
```

---

## Browser Compatibility

✅ Works in:
- Chrome 1.0+
- Firefox 1.0+
- Safari 1.0+
- Edge 12+
- IE 9+ (with some limitations)
- Opera 3.2+
- All mobile browsers

❌ Doesn't work:
- IE 8 and below (no `addEventListener`)
- Very old browsers (pre-2000)

---

## FAQ

### Q: Where does the capitalization happen?
A: In the browser, in the user's email input field, in real-time as they type.

### Q: Is the email stored capitalized in the database?
A: Yes, if you send it to the server with the capital letter capitalized.

### Q: Can users undo the capitalization?
A: If they select the capital letter and type a lowercase letter, it will become uppercase again immediately.

### Q: Does this work with paste?
A: Yes! If the user pastes `abc@test.com`, it becomes `Abc@test.com`.

### Q: What if they paste an email that starts with uppercase?
A: It stays uppercase, which is correct.

---

## Summary

**Minimal Code:** 3 lines of JavaScript  
**With Validation:** ~50 lines total  
**With Full Form:** ~100 lines total  

Choose the version that fits your needs! 🎯
