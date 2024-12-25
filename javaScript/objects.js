// Assignment 1

/*function greet(user){
    console.log("HI" + user.name + " your age is " + user.age);
}


let user = {
	name: "Harkirat",
	age: 19
}

console.log("Harkirats age is " + user.age);
*/


//Assignment 2
let user2 ={
    name:"shoeb iqbal",
    age:21,
    gender:"male"
}



function newUser(user2) {
    if (user2.gender === "male") {
        console.log("Hi Mr. " + user2.name + ", your age is " + user2.age + ".");
    } else if (user2.gender === "female") {
        console.log("Hi Mrs. " + user2.name + ", your age is " + user2.age + ".");
    }
    if(user2.age>18){
        console.log("Eligible to vote");
    }
    else{
        console.log("notElligible for vote");
    }
}
newUser(user2);