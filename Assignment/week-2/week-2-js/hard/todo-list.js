/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = [];
  }

  // Adds a todo to the list of todos
  add(todo) {
    this.todos.push(todo);
  }

  // Removes a todo from the list of todos by index
  remove(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      this.todos.splice(indexOfTodo, 1);
    } else {
      throw new Error("Invalid index");
    }
  }

  // Updates a todo at the given index
  update(index, updatedTodo) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = updatedTodo;
    } else {
      throw new Error("Invalid index");
    }
  }

  // Returns all todos
  getAll() {
    return this.todos;
  }

  // Returns a todo at the given index
  get(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      return this.todos[indexOfTodo];
    } else {
      throw new Error("Invalid index");
    }
  }

  // Deletes all todos
  clear() {
    this.todos = [];
  }
}

// Example usage
const todoList = new Todo();

// Add todos
todoList.add("Learn JavaScript");
todoList.add("Learn React");
todoList.add("Build a project");

// Get all todos
console.log(todoList.getAll()); // Output: ["Learn JavaScript", "Learn React", "Build a project"]

// Get a specific todo
console.log(todoList.get(1)); // Output: "Learn React"

// Update a todo
todoList.update(1, "Learn Redux");
console.log(todoList.getAll()); // Output: ["Learn JavaScript", "Learn Redux", "Build a project"]

// Remove a todo
todoList.remove(0);
console.log(todoList.getAll()); // Output: ["Learn Redux", "Build a project"]

// Clear all todos
todoList.clear();
console.log(todoList.getAll()); // Output: []

module.exports = Todo;