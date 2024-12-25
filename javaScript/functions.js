//function declaration 
function greet(name){
    return "hello , " + name;
}

let message = greet("shoeb");
console.log(message);

//Assignment 1
const sumofNumber =(a,b)=>{
    return a+b;
}

let sum =sumofNumber(2,2);

console.log(sum);

//Assignment 2

function canVote(age){
    if(age>=18){
        return true;
    }
    else{
        return false;
    }
}

let check = canVote(18);
console.log(check);