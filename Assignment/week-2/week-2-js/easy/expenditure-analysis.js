/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  // Create an object to store totals for each category
  const totals = {};

  // Loop through each transaction
  for (const transaction of transactions) {
    const { category, price } = transaction;

    // Add the price to the existing total or initialize it
    if (totals[category]) {
      totals[category] += price;
    } else {
      totals[category] = price;
    }
  }

  // Convert the totals object into an array of objects using for...in
  const result = [];
  for (let category in totals) {
    result.push({ category: category, totalSpent: totals[category] });
  }

  return result;
}

// Example Usage
const transactions = [
  { id: 1, timestamp: 1656076800000, price: 10, category: 'Food', itemName: 'Pizza' },
  { id: 2, timestamp: 1656076800000, price: 20, category: 'Transport', itemName: 'Bus Ticket' },
  { id: 3, timestamp: 1656076800000, price: 15, category: 'Food', itemName: 'Burger' },
];

const result = calculateTotalSpentByCategory(transactions);
console.log(result);


module.exports = calculateTotalSpentByCategory;
