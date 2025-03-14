// map , filter , arrow function 
// given an array , give me back a new array in which every value is multiplied by 2
// [1,2,3,4,5]
// [2.4.6,8,10]

const input1= [1,2,3,4,5];

// solution
// const newArray = []
// for(let i=0;i<input.length;i++){
//   newArray.push(input[i]*3);
//}

//console.log(newArray);

//map() creates a new array by applying a function to each item in the original array.
//other solution with map
function transform(i){
    return i*2;
}
const ans = input1.map(transform);
console.log(ans);

// create a map funtion that takes 2 inputs 
// an array, and a transformation callback/fn
// and transforms the array into a new one using the transformation fn 

// Custom map function
function customMap(arr, transformFn) {
    // Create a new array to store the transformed values
    const newArray = [];
    
    // Loop through each element in the input array
    for (let i = 0; i < arr.length; i++) {
      // Apply the transformation function to the current element
      // and push the result to the new array
      newArray.push(transformFn(arr[i], i, arr));
    }
    
    // Return the new transformed array
    return newArray;
  }
  
  // Example usage:
  const input = [1, 2, 3, 4, 5];
  
  // Define a transformation function that doubles each value
  function double(value) {
    return value * 2;
  }
  
  // Use our custom map function
  const doubled = customMap(input, double);
  console.log(doubled); // [2, 4, 6, 8, 10]
  
  // Using an arrow function for transformation
  const tripled = customMap(input, (value) => value * 3);
  console.log(tripled); // [3, 6, 9, 12, 15]
  
  // We can also access the index in the transformation function
  const withIndex = customMap(input, (value, index) => `${index}: ${value}`);
  console.log(withIndex); // ['0: 1', '1: 2', '2: 3', '3: 4', '4: 5']




// create a map fn that takes an array ans a transform fn as input and returns the transformed array as output 

const map = (arr,fn)=>{
  const transformedArr = [];
  for(let i =0;i<arr.length;i++){
    transformedArr.push(fn(arr[i]));
  }
  return transformedArr;
}



