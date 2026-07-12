// Email field - Convert to lowercase in real-time
const emailInput = document.getElementById('email');

if (emailInput) {
    emailInput.addEventListener('input', function(event) {
        this.value = this.value.toLowerCase();
    });
}

// Signup form submission handler
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let fullName = document.getElementById("fullName").value;
        let email = document.getElementById("email").value.toLowerCase();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let role = "user";

        if (!fullName || !email || !username || !password) {
            alert("Please fill in all fields!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        fetch('http://localhost:8080/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, username, password, role })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Sign up successful! Redirecting to login...");
                window.location.href = "/login";
            } else {
                alert(data.message || "Sign up failed.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred.");
        });
    });
}
