document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let usernameOrEmail = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    if (!usernameOrEmail || !password || !role) {
        alert("Please fill in all fields!");
        return;
    }

    const loginData = {
        usernameOrEmail: usernameOrEmail,
        password: password,
        role: role
    };

    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('userName', data.user.fullName);
            localStorage.setItem('userRole', data.user.role);

            if (role === "admin") {
                window.location.href = "/admin";
            } else if (role === "user") {
                window.location.href = "/dashboard";
            } else {
                window.location.href = "/";
            }
        } else {
            alert(data.message || "Login failed.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred.");
    });
});
