//Callbacks are the function which are passed as an argument to another function 

//Simple Functions Call
function square(n) {
    return n * n;
  }
  
  function cube(n) {
    return n * n * n;
  }
  
  //Dont Repeat YourSelf

  //Try to create a Generic Function 

  function sumOfSquares(a, b,fn) {
    //let square1 = square(a);
    //let square2 = square(b);
    let square1 = fn(a);
    let square2 = fn(b);
    return square1 + square2;
  }
  function sumOfSquares(a, b,fn) {
    //let square1 = square(a);
    //let square2 = square(b);
    let cube1 = fn(a);
    let cube2 = fn(b);
    return cube1 + cube2;
  }
//Hence It is the corerct Example of Callbacks 

  let ans = sumOfSquares(1, 2,square);
  console.log(ans);
  let ans2 = sumOfSquares(1, 2,cube);
  console.log(ans2);