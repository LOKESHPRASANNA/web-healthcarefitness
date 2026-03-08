document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    // Here, you would typically send a request to the server to validate credentials
    // and handle the login logic based on the user role.
    // For demonstration purposes, let's just log the values.
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Role:", role);

    // Redirect users based on their role
    switch (role) {
        case "admin":
            window.location.href = "admin_dashboard.html";
            break;
        case "user":
            window.location.href = "index.html";
            break;
        case "staff":
            window.location.href = "index.html";
            break;
        default:
            alert("Invalid role.");
    }
});
