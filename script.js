const BASE_URL = 'https://pokeapi.co/api/v2/';
let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
let loadedPokemons = [];
let DETAIL_VIEW_OPEN = false;
let offset = 0;
let filteredPokemons = [];

/**
 * Calls additional functions on page load.
 * @function additionalFunctionsonload
 * @returns {Promise<void>} A promise that resolves once all additional functions are called.
 */
async function additionalFunctionsonload() {
    await initContext();
    loadSmallPokemonCards();
}

/**
 * Initializes the context by fetching data and updating the loadedPokemons array.
 * @function initContext
 * @returns {Promise<void>} A promise that resolves once the context is initialized.
 */
async function initContext() {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    loadedPokemons = loadedPokemons.concat(responseAsJSON.results);
}

/**
 * Capitalizes the first letter of a string.
 * @function capitalizeFirstLetter
 * @param {string} pokemonName - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalizeFirstLetter(pokemonName) {
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}

/**
 * Loads small Pokémon cards onto the page.
 * @function loadSmallPokemonCards
 * @param {Array} [pokemons=loadedPokemons] - An array of Pokémon data. Defaults to loadedPokemons array.
 * @returns {Promise<void>} A promise that resolves once the small Pokémon cards are loaded.
 */
async function loadSmallPokemonCards(pokemons = loadedPokemons) {
    clearPokemonCards();
    if (pokemons.length > 0) {
        await renderAllPokemonCards(pokemons);
    }
}

/**
 * Clears all Pokémon cards from the main content area.
 * @function clearPokemonCards
 * @returns {void} This function does not return a value.
 */
function clearPokemonCards() {
    let pokemonCards = document.getElementById('main-content');
    pokemonCards.innerHTML = '';
}

/**
 * Renders all Pokémon cards onto the page.
 * @function renderAllPokemonCards
 * @param {Array} pokemons - An array of Pokémon data.
 * @returns {Promise<void>} A promise that resolves once all Pokémon cards are rendered.
 */
async function renderAllPokemonCards(pokemons) {
    for (let i = 0; i < pokemons.length; i++) {
        let pokemonDetails = await getPokemonDetails(pokemons[i].url);
        let pokemonCardHTML = await createPokemonCardHTML(pokemons[i].name, i, pokemonDetails);
        document.getElementById('main-content').innerHTML += pokemonCardHTML;
    }
}

/**
 * Creates HTML code for a Pokémon card.
 * @function createPokemonCardHTML
 * @param {string} pokemonName - The name of the Pokémon.
 * @param {number} index - The index of the Pokémon.
 * @param {Object} pokemonDetails - Details of the Pokémon.
 * @returns {Promise<string>} A promise that resolves to the HTML code of the Pokémon card.
 */
async function createPokemonCardHTML(pokemonName, index, pokemonDetails) {
    pokemonName = capitalizeFirstLetter(pokemonName);
    let { height, id, sprites, types } = pokemonDetails;
    let formattedType = types.map(typeInfo => typeInfo.type.name).join(', ');
    return await renderSmallCardTemplate(
        pokemonName,
        index,
        types[0].type.name,
        id,
        height * 10,
        formattedType,
        sprites.front_default
    );
}

/**
 * Fetches details of a Pokémon from the given URL.
 * @function getPokemonDetails
 * @param {string} url - The URL to fetch Pokémon details from.
 * @returns {Promise<Object>} A promise that resolves to the details of the Pokémon.
 */
async function getPokemonDetails(url) {
    let response = await fetch(url);
    let pokemonDetails = await response.json();
    return pokemonDetails;
}

/**
 * Displays a large card for the specified Pokémon.
 * @function showLargeCard
 * @param {string} pokemonName - The name of the Pokémon to display the large card for.
 * @returns {void} This function does not return a value.
 */
async function showLargeCard(pokemonName) {
    openLargeCardOverlay();
    let pokemon = findPokemon(pokemonName);
    if (!pokemon) return;
    let pokemonDetails = await getPokemonDetails(pokemon.url);
    await renderLargeCard(pokemonName, pokemonDetails);
    renderAboutSection(pokemonName);
}

/**
 * Finds a Pokémon object by its name.
 * @function findPokemon
 * @param {string} pokemonName - The name of the Pokémon to find.
 * @returns {Object|null} The found Pokémon object, or null if not found.
 */
function findPokemon(pokemonName) {
    let lowerCaseName = pokemonName.toLowerCase();
    return filteredPokemons.length > 0
        ? filteredPokemons.find(p => p.name.toLowerCase() === lowerCaseName)
        : loadedPokemons.find(p => p.name.toLowerCase() === lowerCaseName);
}

async function renderLargeCard(pokemonName, pokemonDetails) {
    let { height, types, id, sprites } = pokemonDetails;
    let formattedPokemonName = capitalizeFirstLetter(pokemonName);
    let formattedType = types.map(typeInfo => typeInfo.type.name).join(', ');
    let singleLargeCard = document.getElementById('detailview-single-card');
    singleLargeCard.innerHTML = await largeCardTemplate(
        types[0].type.name,
        pokemonName,
        formattedPokemonName,
        id,
        formattedType,
        height * 10,
        sprites.front_default
    );
}

/**
 * Renders a large card for the specified Pokémon.
 * @function renderLargeCard
 * @param {string} pokemonName - The name of the Pokémon.
 * @param {Object} pokemonDetails - Details of the Pokémon.
 * @returns {Promise<void>} A promise that resolves once the large card is rendered.
 */
function openLargeCardOverlay() {
    if (DETAIL_VIEW_OPEN == false) {
        document.getElementById('detailview-single-card').classList.remove('d-none');
        document.getElementById('dark-overlay').classList.add('dark-overlay-styling');
    }
    DETAIL_VIEW_OPEN = true;
}

/**
 * Closes the large card view if it is open.
 * @function closeLargeCard
 * @returns {void} This function does not return a value.
 */
function closeLargeCard() {
    if (DETAIL_VIEW_OPEN == true) {
        removeDarkOverlay()
        document.getElementById('detailview-single-card').classList.add('d-none');
    }
    DETAIL_VIEW_OPEN = false;
}

/**
 * Removes the dark overlay from the page.
 * @function removeDarkOverlay
 * @returns {void} This function does not return a value.
 */
function removeDarkOverlay() {
    document.getElementById('dark-overlay').classList.remove('dark-overlay-styling');
}

/**
 * Renders the "About" section for the specified Pokémon.
 * @function renderAboutSection
 * @param {string} pokemonName - The name of the Pokémon.
 * @returns {Promise<void>} A promise that resolves once the "About" section is rendered.
 */
async function renderAboutSection(pokemonName) {
    let pokemon = findPokemon(pokemonName);
    if (!pokemon) return;
    let pokemonDetails = await getPokemonDetails(pokemon.url);
    await updateAboutSection(pokemonDetails);
    highlightAboutSection();
}

/**
 * Finds a Pokémon object by its name.
 * @function findPokemon
 * @param {string} pokemonName - The name of the Pokémon to find.
 * @returns {Object|null} The found Pokémon object, or null if not found.
 */
function findPokemon(pokemonName) {
    let lowerCaseName = pokemonName.toLowerCase();
    return filteredPokemons.length > 0
        ? filteredPokemons.find(p => p.name.toLowerCase() === lowerCaseName)
        : loadedPokemons.find(p => p.name.toLowerCase() === lowerCaseName);
}

/**
 * Updates the "About" section for a Pokémon with the provided details.
 * @function updateAboutSection
 * @param {Object} pokemonDetails - Details of the Pokémon.
 * @returns {Promise<void>} A promise that resolves once the "About" section is updated.
 */
async function updateAboutSection(pokemonDetails) {
    let { weight, height, id, base_experience, types, abilities } = pokemonDetails;
    let formattedType = types.map(typeInfo => typeInfo.type.name).join(', ');
    let formattedAbilities = abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
    let aboutSection = document.getElementById('lower-information-large-card');
    aboutSection.innerHTML = await aboutSectionTemplate(
        weight / 10,
        id,
        formattedType,
        height * 10,
        base_experience,
        formattedAbilities
    );
}

/**
 * Highlights the "About" section in the large card view.
 * @function highlightAboutSection
 * @returns {void} This function does not return a value.
 */
function highlightAboutSection() {
    document.getElementById('status-large-card-id').classList.remove('bold-underline');
    document.getElementById('about-large-card-id').classList.add('bold-underline');
}

/**
 * Renders the base stats section for a Pokémon.
 * @function renderBaseStats
 * @param {string} pokemonName - The name of the Pokémon.
 * @returns {Promise<void>} A promise that resolves once the base stats section is rendered.
 */
async function renderBaseStats(pokemonName) {
    updateTabStyles();
    await renderCanvasContainer();
    let pokemon = findPokemonByName(pokemonName);
    if (!pokemon) return;
    let pokemonDetails = await getPokemonDetails(pokemon.url);
    let abilities = extractAbilities(pokemonDetails);
    renderChart(abilities);
}

/**
 * Updates the styles of the tabs in the large card view.
 * @function updateTabStyles
 * @returns {void} This function does not return a value.
 */
function updateTabStyles() {
    document.getElementById('about-large-card-id').classList.remove('bold-underline');
    document.getElementById('status-large-card-id').classList.add('bold-underline');
}

/**
 * Renders the canvas container for displaying base stats.
 * @function renderCanvasContainer
 * @returns {Promise<void>} A promise that resolves once the canvas container is rendered.
 */
async function renderCanvasContainer() {
    let baseStatsSection = document.getElementById('lower-information-large-card');
    baseStatsSection.innerHTML = '';
    baseStatsSection.innerHTML = await canvasContainerTemplate();
}

/**
 * Finds a Pokémon object by its name.
 * @function findPokemonByName
 * @param {string} pokemonName - The name of the Pokémon to find.
 * @returns {Object|null} The found Pokémon object, or null if not found.
 */
function findPokemonByName(pokemonName) {
    return filteredPokemons.length > 0
        ? filteredPokemons.find(p => p.name.toLowerCase() === pokemonName.toLowerCase())
        : loadedPokemons.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());
}

/**
 * Extracts the abilities of a Pokémon from its details.
 * @function extractAbilities
 * @param {Object} pokemonDetails - Details of the Pokémon.
 * @returns {number[]} An array containing the abilities of the Pokémon.
 */
function extractAbilities(pokemonDetails) {
    return pokemonDetails.stats.map(stat => stat.base_stat);
}

async function loadMorePokemon() {
    const loadMoreButton = document.getElementById('load-more-pokemon-button');
    loadMoreButton.classList.add('disabled');
    loadMoreButton.onclick = null;
    offset += 20;
    url = `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offset}`;
    await initContext();
    await loadSmallPokemonCards();
    loadMoreButton.classList.remove('disabled');
    loadMoreButton.onclick = loadMorePokemon;
}


/**
 * Searches the Pokémon list based on user input.
 * @function searchPokemonList
 * @returns {void} This function does not return a value.
 */
function searchPokemonList() {
    let input = document.getElementById('input-search-field').value.toLowerCase();
    filteredPokemons = loadedPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input));
    loadSmallPokemonCards(filteredPokemons);
}

/**
 * Shows the previous Pokémon card in the large card view.
 * @function showPreviousCard
 * @param {string} pokemonName - The name of the current Pokémon.
 * @returns {Promise<void>} A promise that resolves once the previous card is shown.
 */
async function showPreviousCard(pokemonName) {
    let pokemons = filteredPokemons.length > 0 ? filteredPokemons : loadedPokemons;
    let index = pokemons.findIndex(p => p.name.toLowerCase() === pokemonName.toLowerCase());
    if (index > 0) {
        await showLargeCard(pokemons[index - 1].name);
    }
}

/**
 * Shows the next Pokémon card in the large card view.
 * @function showNextCard
 * @param {string} pokemonName - The name of the current Pokémon.
 * @returns {Promise<void>} A promise that resolves once the next card is shown.
 */
async function showNextCard(pokemonName) {
    let pokemons = filteredPokemons.length > 0 ? filteredPokemons : loadedPokemons;
    let index = pokemons.findIndex(p => p.name.toLowerCase() === pokemonName.toLowerCase());
    if (index < pokemons.length - 1) {
        await showLargeCard(pokemons[index + 1].name);
    }
}