let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'; 
let loadedPokemons = [];
let DETAIL_VIEW_OPEN = false;

function loadPokemon(){


}


 async function initContext(){
let response = await fetch(url)
let responseASJSON = await response.json()
console.log(responseASJSON)

}