// Email field - Convert to lowercase in real-time
const emailInput = document.getElementById('email');

emailInput.addEventListener('input', function(event) {
    // Convert email to lowercase while typing
    this.value = this.value.toLowerCase();
});

// Signup form submission handler
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value.toLowerCase();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let role = "user"; // Automatically set to 'user' - cannot be changed

    // Validation
    if (!fullName || !email || !username || !password) {
        alert("Please fill in all fields!");
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    // Log form data for demonstration
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Role:", role);

    // Here, you would typically send a POST request to the server
    // Example: Send data to /api/signup endpoint
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
            // Redirect to login page
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
