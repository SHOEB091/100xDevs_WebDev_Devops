class Animal {
    // Constructor method
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }

    // Instance method
    makeSound() {
        console.log(`${this.name} makes a sound.`);
    }

    // Static method
    static kingdom() {
        return 'Animalia';
    }
}

// Creating an instance of the class
const animal1 = new Animal('Lion', 'Panthera leo');
animal1.makeSound(); // Output: Lion makes a sound.

// Accessing a static method
console.log(Animal.kingdom()); // Output: Animalia