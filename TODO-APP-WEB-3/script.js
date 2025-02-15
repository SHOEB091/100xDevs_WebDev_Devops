/*let ctr =0;
//Updating the element 
function callback(){
    const el = document.querySelectorAll('h3')[1]
    el.innerHTML = ctr;
    ctr=ctr+1;
}


setInterval(callback, 2000);
*/

// Counter for todo items
let ctr = 1;

// Function to delete a todo item
function deleteTodo(index) {
    const element = document.getElementById(index);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

// Function to add a new todo item
function addTodo() {
    const inputEl = document.querySelector("input");
    const value = inputEl.value.trim();

    if (value === '') {
        alert('Please enter a todo');
        return;
    }

    const newDivEl = document.createElement("div");
    newDivEl.setAttribute("id", "todo-" + ctr);

    newDivEl.innerHTML = "<div>" + value + '</div> <button onclick="deleteTodo(\'todo-' + ctr + '\')">Delete</button>';

    document.querySelector("body").appendChild(newDivEl);

    ctr++;
    inputEl.value = '';
}

// Example usage
document.getElementById('add-todo-button').onclick = addTodo;