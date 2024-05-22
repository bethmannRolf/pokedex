const BASE_URL = 'https://pokeapi.co/api/v2/'


let url = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0';

let loadedPokemons = [];
let DETAIL_VIEW_OPEN = false;
let pokemonJSON = []

function loadPokemon() {


}

function additionalFunctionsonload() {
    createPokemonCard()
}


async function initContext() {
    let response = await fetch(url)
    let responseASJSON = await response.json()
    console.log(responseASJSON)

}


function createPokemonCard() {
    let cardContent = document.getElementById('single-card-main-content');
    cardContent.innerHTML = `<span class="hallo-span"></span>`
    
}
