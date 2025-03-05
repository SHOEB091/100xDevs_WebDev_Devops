const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const FILE_PATH = 'todo.json';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read todos from the file
function readTodosFromFile() {
  if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } else {
    // Create the file with an empty array if it does not exist
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    return [];
  }
}

// Write todos to the file
function writeTodosToFile(todos) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

// Generate a unique ID for each todo using Math.random
function generateId() {
  return Math.floor(Math.random() * 1000000);
}

app.post('/', function (req, res) {
  // Extract the todo title from the body
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const todos = readTodosFromFile();
  const newTodo = {
    title,
    id: generateId(),
  };

  todos.push(newTodo);
  writeTodosToFile(todos);
  res.status(201).json(newTodo);
});

app.delete('/:id', function (req, res) {
  // Extract the todo id
  const { id } = req.params;
  const todos = readTodosFromFile();
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  writeTodosToFile(todos);
  res.status(204).send();
});

app.put('/:id', function (req, res) {
  // Extract the todo id and new title
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const todos = readTodosFromFile();
  const todo = todos.find(todo => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.title = title;
  writeTodosToFile(todos);
  res.json(todo);
});

app.get('/', function (req, res) {
  const todos = readTodosFromFile();
  res.json({ todos });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});