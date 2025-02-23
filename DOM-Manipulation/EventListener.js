//Dom Event Listener 

// Attaches an event handler to the specified element (without overwriting event handlers).
// you can add many event handlers (even of same type ) to one element.
// yoiu cna add event listerners to any dom object not only html elements i.e the window object 
// The addEventListener() method makes it easier to control how the events reacts to bubbling.
// wehn using the addEventListener() method the javaScript is seperated from the HTML markuo for better readability and allows 
// you to add event listeners even when you do not contril the HTML markup
// you can easily remove an event listener by using the removeEventListener() method .

//bubbling means how the event is applid that you have created  and applied to outermost element to inner most element and innner most element to outer most element 

// What is a DOM Event Listener?
// A DOM Event Listener is a function that waits for an event (like a click, keypress, etc.) to happen on an element. When the event occurs, the function runs.

// Basic Syntax of addEventListener()

element.addEventListener(event, function(){}, useCapture);
// element → The HTML element to listen to
// event → The type of event (e.g., "click", "mouseover", "keydown")
// function → The function that runs when the event occurs
// useCapture (optional) → Boolean (default false for bubbling, true for capturing)




{/* <button id="myButton">Click Me</button> */}
//1 Click Event Listener
document.getElementById("myButton").addEventListener("click", function () {
    alert("Button was clicked!");
});



//2 Mouseiver Event 
{/* <div id="hoverBox" style="width: 200px; height: 100px; background-color: lightblue;">Hover over me</div> */}


document.getElementById("hoverBox").addEventListener("mouseover", function () {
    this.style.backgroundColor = "yellow"; // Changes background on hover
});



{/* <input type="text" id="textInput" placeholder="Type something..." /> */}

//3 Keypress Event 

document.getElementById("textInput").addEventListener("keydown", function (event) {
    console.log("Key pressed: " + event.key);
});



//4 Remove Event Listener 
// <button id="toggleButton">Click to Disable</button>

function showMessage() {
    alert("Button clicked!");
}

const button = document.getElementById("toggleButton");
button.addEventListener("click", showMessage);

// Remove event listener after 3 seconds
setTimeout(() => {
    button.removeEventListener("click", showMessage);
    alert("Event Listener Removed!");
}, 3000);

