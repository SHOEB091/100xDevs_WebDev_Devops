const title = document.querySelector('h1');
console.log(title.innerHTML);

//Fetch the first todo list 
const firstTodo1 = document.querySelector('h4');
console.log(firstTodo1.innerHTML)

//Second todo list 
const secondTodo = document.querySelectorAll('h4')[1];
console.log(secondTodo.innerHTML)

//Update the first todo's contents
const firstTodo = document.querySelector('h4');
firstTodo.innerHTML = "1. Dont take class";
