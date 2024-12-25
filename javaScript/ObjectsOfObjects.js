const user1 = {
	name: "harkirat",
	age: 19,
	address: {
		city: "Delhi",
		country: "India",
		address: "1122 DLF"
	}
}

const city = user1.address.city;
console.log(city);

// Assignmnet 1
const users = [
    {
        name: "harkirat",
        age: 19,
        gender: "male",
        address: {
            city: "Delhi",
            country: "India",
            address: "1122 DLF"
        }
    },
    {
        name: "shoeb",
        age: 21,
        gender: "male",
        address: {
            city: "Mumbai",
            country: "India",
            address: "3344 Andheri"
        }
    },
    {
        name: "farhan",
        age: 17,
        gender: "male",
        address: {
            city: "Bangalore",
            country: "India",
            address: "5566 Whitefield"
        }
    },
    {
        name: "john doe",
        age: 25,
        gender: "female",
        address: {
            city: "Chennai",
            country: "India",
            address: "7788 OMR"
        }
    }
];

users.push({
    name: "new user",
    age: 22,
    gender: "male",
    address: {
        city: "Hyderabad",
        country: "India",
        address: "9900 Banjara Hills"
    }
});


function filterAdultMales(users) {
    return users.filter(user => user.age > 18 && user.gender === "male");
}

const adultMales = filterAdultMales(users);
console.log(adultMales);


console.log("Naother mmethod")
// another method 

function solve(users) {
    let arr2 = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].gender === "male" && users[i].age > 18) {
            arr2.push(users[i]);
        }
    }
    return arr2;
}

console.log(solve(users));