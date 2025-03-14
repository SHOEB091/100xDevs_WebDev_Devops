// map , filter , arrow function 
// given an array , give me back a new array in which every value is multiplied by 2
// [1,2,3,4,5]
// [2.4.6,8,10]

const input = [1,2,3,4,5];

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
const ans = input.map(transform);
console.log(ans);





