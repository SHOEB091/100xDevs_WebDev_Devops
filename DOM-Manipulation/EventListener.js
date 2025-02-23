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