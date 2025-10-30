import React from 'react'
import { useState ,useEffect} from 'react'
const StatesHooks = () => {
    const [count,setCount]= useState(0);

    function increaseCount(){
      setCount(count+1);
    }
  return (
    <div>
       <h1 id="counter">{count}</h1>
    <button className="increment-button" onClick={increaseCount}>Increment count</button>
    <button className="decrement-button" onClick={decreaseCount}>Decrement count</button>
    <button className="reset-button" onClick={resetCount}>Reset count</button>
    </div>
  )
}

export default StatesHooks
