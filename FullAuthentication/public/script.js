// ...script.js...
async function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    await axios.post("/signup", { userName: username, password });
    alert("Signed up successfully");
}

async function signin() {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;
    const response = await axios.post("/signin", { userName: username, password });
    localStorage.setItem("token", response.data.token);
    alert("Signed in successfully");
    getUserInformation();
}

async function logout() {
    localStorage.removeItem("token");
    document.getElementById("information").innerHTML = "";
    alert("Logged out");
}

async function getUserInformation() {
    const token = localStorage.getItem("token");
    if (token) {
        const response = await axios.get("/me", {
            headers: { Authorization: token }
        });
        document.getElementById("information").innerHTML = response.data.username;
    }
}

getUserInformation();
// ...end script.js...
