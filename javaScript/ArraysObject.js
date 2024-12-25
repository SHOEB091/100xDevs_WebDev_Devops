/*const users = [{
    name: "Harkirat",
    age: 21
}, {
    name: "raman",
    age: 22
}
]

const user1 = users[0] 
const user1Age = users[0].age

console.log(user1);
console.log(user1Age);
*/


// Assignmnet 1


const users = [{
    name: "shoeb",
    age: 21
}, {
    name: "farhan Leda",
    age: 25
}, {
    name: "john doe",
    age: 17
}];

function filterAdultUsers(users) {
    return users.filter(user => user.age > 18);
}

const adultUsers = filterAdultUsers(users);
console.log(adultUsers);



