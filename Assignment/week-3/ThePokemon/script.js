document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const fetchButton = document.getElementById("fetchPokemon");
    const numInput = document.getElementById("numPokemon");
    const categorySelect = document.getElementById("pokemonCategory");
    const pokemonContainer = document.getElementById("pokemonContainer");

    // Add click event listener to the button
    fetchButton.addEventListener("click", async () => {
        // Clear previous results
        pokemonContainer.innerHTML = "";

        // Get user input values
        const numPokemon = parseInt(numInput.value);
        const category = categorySelect.value;

        // Validate input
        if (isNaN(numPokemon) || numPokemon <= 0 || numPokemon > 50) {
            alert("Please enter a valid number between 1 and 50.");
            return;
        }

        // Generate random Pokémon IDs
        const pokemonIDs = generateRandomIDs(numPokemon, 1010);

        // Fetch and display Pokémon data
        for (const id of pokemonIDs) {
            const pokemonData = await fetchPokemon(id);
            if (pokemonData) {
                if (category === "all" || pokemonData.types.includes(category)) {
                    displayPokemonCard(pokemonData);
                }
            }
        }
    });

    // Function to generate unique random IDs
    function generateRandomIDs(count, maxID) {
        const ids = new Set();
        while (ids.size < count) {
            ids.add(Math.floor(Math.random() * maxID) + 1);
        }
        return Array.from(ids);
    }

    // Function to fetch Pokémon data from API
    async function fetchPokemon(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) throw new Error("Failed to fetch Pokémon");

            const data = await response.json();
            return {
                id: data.id,
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Capitalize name
                image: data.sprites.front_default, // Pokémon sprite
                types: data.types.map(type => type.type.name) // Extract types
            };
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
            return null;
        }
    }

    // Function to display Pokémon cards
    function displayPokemonCard(pokemon) {
        // Create card element
        const card = document.createElement("div");
        card.classList.add("pokemon-card");

        // Add Pokémon details
        card.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <p>Type: ${pokemon.types.join(", ")}</p>
        `;

        // Append card to container
        pokemonContainer.appendChild(card);
    }
});
