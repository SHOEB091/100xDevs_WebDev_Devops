import React, { useState } from 'react'
import StatesHooks from '../components/StatesHooks.jsx'; // default import

const App = () => {
  return (
    <div>
      <h1>Hello React!</h1>
      <Counter></Counter>
      <StatesHooks />
    </div>
  )
}



function Counter(){
  //useState is a Hook that lets you add state to functional components. It returns an array with the current state and a function to update it.
  const [count,setCount]= useState(0);

  // function increaseCount(){
  //   count = 0;
  //   document.getElementById("counter").innerText = ++count;
  // }
  function increaseCount(){
    setCount(count+1);
  }
  function decreaseCount(){
    setCount(count-1);
  }
  function resetCount(){
    setCount(0);
  }

  return <div>
    <h1 id="counter">{count}</h1>
    <button className="increment-button" onClick={increaseCount}>Increment count</button>
    <button className="decrement-button" onClick={decreaseCount}>Decrement count</button>
    <button className="reset-button" onClick={resetCount}>Reset count</button>
  </div>

}


export default App
