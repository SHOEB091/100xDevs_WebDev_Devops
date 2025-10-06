// let count = 1; // Keeps track of how many todos we have

// // Function to add a new todo
// function addTodo(event) {
//     event.preventDefault(); // Stops the page from reloading
//     let inputBox = document.querySelector("#add-form input"); // Gets the input box
//     let todoText = inputBox.value.trim(); // Gets what you typed

//     // Check if the input is empty
//     if (todoText === "") {
//         alert("Please type something to add!");
//         return; // Stop if nothing is typed
//     }

//     // Create a new list item with the todo and a delete button
//     let newItem = document.createElement("li");
//     newItem.innerHTML = todoText + " <button class='delete-btn'>Delete</button>";
//     document.querySelector("#todo-list").appendChild(newItem); // Add it to the list

//     count++; // Increase the count
//     inputBox.value = ""; // Clear the input box
// }

// // Function to delete a todo when the delete button is clicked
// document.querySelector("#todo-list").addEventListener("click", function(event) {
//     if (event.target.classList.contains("delete-btn")) {
//         event.target.parentElement.remove(); // Removes the whole todo item
//     }
// });

// // Add the addTodo function when the Add Todo button is clicked
// document.querySelector(".add-todo").addEventListener("click", addTodo);

// --- Signup ---
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
            localStorage.setItem('token', data.token);
            alert('Signup successful!');
            fetchTodos(); // Fetch todos after signup
        } else {
            alert('Signup failed: ' + data.message);
        }
    } catch (error) {
        alert('An error occurred during signup.');
    }
});

// --- Signin ---
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
            localStorage.setItem('token', data.token);
            alert('Signin successful!');
            fetchTodos(); // Fetch todos after signin
        } else {
            alert('Signin failed: ' + data.message);
        }
    } catch (error) {
        alert('An error occurred during signin.');
    }
});

// --- Add Todo ---
document.querySelector(".add-todo").addEventListener("click", addTodo);

async function addTodo(event) {
    event.preventDefault();
    const inputBox = document.querySelector('input[name="todo"]');
    const todoText = inputBox.value.trim();
    if (todoText === "") {
        alert("Please type something to add!");
        return;
    }
    const token = localStorage.getItem('token');
    const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ text: todoText })
    });
    const todo = await res.json();
    if (res.ok) {
        renderTodo(todo);
        inputBox.value = "";
    } else {
        alert(todo.message || "Failed to add todo");
    }
}

// --- Fetch Todos ---
async function fetchTodos() {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/todos', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const todos = await res.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = "";
    if (res.ok) {
        todos.forEach(renderTodo);
    } else {
        alert(todos.message || "Failed to fetch todos");
    }
}

// --- Render Todo ---
function renderTodo(todo) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.innerHTML = `
        ${todo.text}
        <button class="delete-btn" data-id="${todo._id}">Delete</button>
    `;
    todoList.appendChild(li);
}

// --- Delete Todo ---
document.getElementById('todo-list').addEventListener('click', async function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const todoId = event.target.getAttribute('data-id');
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await res.json();
        if (res.ok) {
            event.target.parentElement.remove();
        } else {
            alert(result.message || "Failed to delete todo");
        }
    }
});

// --- Optionally, fetch todos on page load if token exists ---
if (localStorage.getItem('token')) {
    fetchTodos();
}