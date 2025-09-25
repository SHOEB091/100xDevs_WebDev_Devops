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