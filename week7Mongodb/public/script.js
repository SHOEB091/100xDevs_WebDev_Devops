let count = 1; // Keeps track of how many todos we have

// Function to add a new todo
function addTodo(event) {
    event.preventDefault(); // Stops the page from reloading
    let inputBox = document.querySelector("#add-form input"); // Gets the input box
    let todoText = inputBox.value.trim(); // Gets what you typed

    // Check if the input is empty
    if (todoText === "") {
        alert("Please type something to add!");
        return; // Stop if nothing is typed
    }

    // Create a new list item with the todo and a delete button
    let newItem = document.createElement("li");
    newItem.innerHTML = todoText + " <button class='delete-btn'>Delete</button>";
    document.querySelector("#todo-list").appendChild(newItem); // Add it to the list

    count++; // Increase the count
    inputBox.value = ""; // Clear the input box
}

// Function to delete a todo when the delete button is clicked
document.querySelector("#todo-list").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove(); // Removes the whole todo item
    }
});

// Add the addTodo function when the Add Todo button is clicked
document.querySelector(".add-todo").addEventListener("click", addTodo);

// Handle signup form submission
document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Signup successful! Token: ' + data.token);
        } else {
            alert('Signup failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup.');
    }
});

// Handle signin form submission
document.getElementById('signin-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = this.email.value;
    const password = this.password.value;

    try {
        const response = await fetch('/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Signin successful! Token: ' + data.token);
        } else {
            alert('Signin failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error during signin:', error);
        alert('An error occurred during signin.');
    }
});     

/* With Axious  */
/*
    document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;

    try {
        const res = await axios.post('/register', { username, email, password });
        alert('Signup successful! Token: ' + res.data.token);
    } catch (error) {
        alert('Signup failed: ' + (error.response?.data?.message || error.message));
    }
});


document.getElementById('signin-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = this.email.value;
    const password = this.password.value;

    try {
        const res = await axios.post('/signin', { email, password });
        alert('Signin successful! Token: ' + res.data.token);
    } catch (error) {
        alert('Signin failed: ' + (error.response?.data?.message || error.message));
    }
});
*/

