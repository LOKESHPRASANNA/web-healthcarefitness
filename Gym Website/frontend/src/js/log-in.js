document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let usernameOrEmail = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    // Validation
    if (!usernameOrEmail || !password || !role) {
        alert("Please fill in all fields!");
        return;
    }

    // Prepare login data
    const loginData = {
        usernameOrEmail: usernameOrEmail,
        password: password,
        role: role
    };

    // Send login request to server
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login successful! Redirecting...");
            // Redirect users based on their role
            switch (role) {
                case "admin":
                    window.location.href = "/admin";
                    break;
                case "user":
                    window.location.href = "/";
                    break;
                case "staff":
                    window.location.href = "/";
                    break;
                default:
                    window.location.href = "/";
            }
        } else {
            alert(data.message || "Login failed. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});
