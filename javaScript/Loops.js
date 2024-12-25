//FOR LOOP
// for(let i=0;i<5;i++){
//     console.log(i);
// }


//While Loop 
// let j=0;
// while(j<5){
//     console.log(j);
//     j++;
// }

//sum of numbers 

function  sumOfNumber(num){

    let sum =0;
    for(let i=0;i<num;i++){

        sum=sum+num;
    }
    return sum;
}    
let message = sumOfNumber(5);
console.log(message);
