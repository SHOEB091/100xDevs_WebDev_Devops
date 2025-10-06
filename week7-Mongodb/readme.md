# Full Stack Todo App

A simple full-stack todo app with user authentication and MongoDB backend.

---

## Features

- **User Signup & Signin** (JWT-based authentication)
- **Add Todo** (stored in MongoDB)
- **Fetch Todos** (only for logged-in user)
- **Delete Todo** (removes from MongoDB)
- **Frontend-Backend Connection** using `fetch` API

---

## How It Works

### 1. **Authentication Flow**

- **Signup:**  
  - User registers with username, email, password.
  - Backend saves user and returns a JWT token.
  - Token is stored in `localStorage`.

- **Signin:**  
  - User logs in with email and password.
  - Backend verifies credentials and returns JWT token.
  - Token is stored in `localStorage`.

### 2. **Todo Flow**

- **Add Todo:**  
  - User enters a todo and clicks "Add Todo".
  - JS sends POST `/api/todos` with `{ text }` and JWT token.
  - Backend saves todo for the user.

- **Fetch Todos:**  
  - On login/signup or page load, JS sends GET `/api/todos` with JWT token.
  - Backend returns todos for the logged-in user.

- **Delete Todo:**  
  - User clicks "Delete" button.
  - JS sends DELETE `/api/todos/:id` with JWT token.
  - Backend deletes todo from MongoDB.

---

## Key Frontend Code (`public/script.js`)

```javascript
// Signup
document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;
    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Signup successful!');
        fetchTodos();
    } else {
        alert('Signup failed: ' + data.message);
    }
});

// Signin
document.getElementById('signin-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const response = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Signin successful!');
        fetchTodos();
    } else {
        alert('Signin failed: ' + data.message);
    }
});

// Add Todo
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

// Fetch Todos
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

// Render Todo
function renderTodo(todo) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.innerHTML = `
        ${todo.text}
        <button class="delete-btn" data-id="${todo._id}">Delete</button>
    `;
    todoList.appendChild(li);
}

// Delete Todo
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

// Fetch todos on page load if token exists
if (localStorage.getItem('token')) {
    fetchTodos();
}
```

---

## Backend Overview

- **Express** for server and routing
- **Mongoose** for MongoDB models
- **JWT** for authentication
- **Routes:**  
  - `/register` (signup)  
  - `/signin` (login)  
  - `/api/todos` (CRUD for todos, protected by JWT)

---

## How to Run

1. Start MongoDB (local or Atlas).
2. Run backend:  
   ```sh
   node index.js
   ```
3. Open `index.html` in browser.
4. Register, login, add, fetch, and delete todos!

---

## Notes

- All todo actions require the user to be logged in (JWT token in `localStorage`).
- Only the logged-in user's todos are shown and managed.
- For deployment, set up environment variables and use a production database.

---

**Happy Coding!**