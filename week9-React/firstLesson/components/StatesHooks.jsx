import React, { useState, useEffect } from 'react';

const StatesHooks = () => {
  // mounting a timer that increments count every second
  const [count, setCount] = useState(0);

  console.log("counter");

  useEffect(function() {
    setInterval(function(){
        setCount(function(count){
            return count + 1;
        })
    },1000);
    console.log("mounted");
     // cleanup on unmount
  }, []);

  // optional handlers
  // const increaseCount = () => setCount(c => c + 1);
  // const decreaseCount = () => setCount(c => c - 1);
  // const resetCount = () => setCount(0);

  return (
    <div>
      <h2 id="counter">{count}</h2>
      {/* <button onClick={increaseCount}>Increment</button>
      <button onClick={decreaseCount}>Decrement</button>
      <button onClick={resetCount}>Reset</button> */}
    </div>
  );
};

export default StatesHooks;