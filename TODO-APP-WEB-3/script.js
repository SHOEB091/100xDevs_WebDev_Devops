/*let ctr =0;
//Updating the element 
function callback(){
    const el = document.querySelectorAll('h3')[1]
    el.innerHTML = ctr;
    ctr=ctr+1;
}


setInterval(callback, 2000);
*/

//adding todo 

function addTodo(){
    const inputEl = document.querySelector("input");
    const value = inputEl.value;

    const newDivEl = document.createElement("div");
    newDivEl.innerHTML = value;

    document.querySelector("body").appendChild(newDivEl);
}