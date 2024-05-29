const BASE_URL = 'https://pokeapi.co/api/v2/';
let url = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0';
let ditto = 'https://pokeapi.co/api/v2/pokemon/ditto'; // Test
let singlePokemon = 'https://pokeapi.co/api/v2/pokemon/1/'
let loadedPokemons = [];

async function init(){
await loadPokemonFromServer()
}


async function loadPokemonFromServer(){
let response = await fetch(singlePokemon);
let responseAsJSON = await response.json();
loadedPokemons = responseAsJSON.results;
console.log(singlePokemon)
}

