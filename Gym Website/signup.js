document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let fullName = document.getElementById("fullName").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    // Here, you would typically send a request to the server to store the user information.
    // For demonstration purposes, let's just log the values.
    console.log("Full Name:", fullName);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Role:", role);

    alert("Sign up successful!");
    window.location.href = "log-in.html"; // Redirect to login page
});
