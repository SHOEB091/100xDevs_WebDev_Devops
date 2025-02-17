let todos = [];

function addTodo() {
  const inputEl = document.querySelector("input");
  const value = inputEl.value.trim();

  if (value === '') {
    alert('Please enter a todo');
    return;
  }

  todos.push({
    title: value
  });

  inputEl.value = '';
  render();
}

function deleteLastTodo() {
  todos.splice(todos.length - 1, 1); // remove the last element from the array
  render();
}

function deleteFirstTodo() {
  todos.splice(0, 1); // remove the first element from the array
  render();
}

function deleteTodo(index) {
  todos.splice(index, 1); // remove the element at the specified index
  render();
}

function createTodoComponent(todo, index) {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const button = document.createElement("button");

  h1.innerHTML = todo.title;
  button.innerHTML = "Delete";
  button.onclick = function() {
    deleteTodo(index);
  };

  div.append(h1);
  div.append(button);
  return div;
}

function render() {
  const todosContainer = document.querySelector("#todos");
  todosContainer.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const element = createTodoComponent(todos[i], i);
    todosContainer.appendChild(element);
  }
}