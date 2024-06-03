/**
 * Generates a template for a small card displaying basic Pokémon information.
 * @function renderSmallCardTemplate
 * @param {string} pokemonName - The name of the Pokémon.
 * @param {number} i - The index of the Pokémon.
 * @param {string} firstType - The primary type of the Pokémon.
 * @param {number} pokeID - The ID of the Pokémon.
 * @param {number} pokemonHeight - The height of the Pokémon.
 * @param {string} formattedType - The formatted type(s) of the Pokémon.
 * @param {string} pokemonImage - The URL of the Pokémon's image.
 * @returns {Promise<string>} A promise that resolves to the generated template string.
 */
async function renderSmallCardTemplate(pokemonName, i, firstType,  pokeID, pokemonHeight, formattedType, pokemonImage){
return`
<div onclick="showLargeCard('${pokemonName}')" id="smallcard${i}" class="whole-pokemon-card ${firstType}">
    <div class="upper-div-small-card">
        <div class="pokemon-name-small-card">
            <span class="pokemon-name-small-card-span">${pokemonName}</span>
        </div>
        <div class="pokemon-id-small-card">
            <span class="pokeID-small-card-span">Poke-ID: ${pokeID}</span>
        </div>
    </div>
    <div class="lower-div-small-card">
        <div class="lower-small-card-left">
            <div class="lower-left-small-height-div">
                <span class="lower-left-small-height">Height: ${pokemonHeight} cm  </span>
            </div>
            <div class="type-div-smallcard-styling" id="type-div-small-card">
                <span class="pokemon-type-small-card">Type: ${formattedType}</span>
            </div>
        </div>
        <div class="lower-small-card-right">
            <img class="pokemon-image-small-card" id="pokemon-image-small-card-for-hover${i}" src="${pokemonImage}">
        </div>
    </div>
</div>
`
}

/**
 * Generates a template for a large card displaying Pokémon details.
 * @function largeCardTemplate
 * @param {string} firstType - The primary type of the Pokémon.
 * @param {string} pokemonName - The name of the Pokémon.
 * @param {string} formattedPokemonName - The formatted name of the Pokémon.
 * @param {number} pokeID - The ID of the Pokémon.
 * @param {string} formattedType - The formatted type(s) of the Pokémon.
 * @param {number} pokemonHeight - The height of the Pokémon.
 * @param {string} pokemonImage - The URL of the Pokémon's image.
 * @returns {Promise<string>} A promise that resolves to the generated template string.
 */
async function largeCardTemplate(firstType, pokemonName, formattedPokemonName, pokeID, formattedType, pokemonHeight, pokemonImage){
    return`
    <div class="single-large-card-styling ${firstType}">
        <div class="close-section-large-card">
            <img onclick="closeLargeCard()" class="close-button-large-card-styling" id="close-button-large-card" src="/img/close.svg">
        </div>
        <div class="pokemon-name-large-card-div">
            <img onclick="showPreviousCard('${pokemonName}')" class="previous-pokemon-responsive d-none" src="/img/arrow_back.svg" >
            <span class="pokemon-name-large-card-styling">${formattedPokemonName}</span>
            <img onclick="showNextCard('${pokemonName}')" class="next-pokemon-responsive d-none" src="/img/arrow_forward.svg">
        </div>
        <div class="type-div-large-card">
            <span class="id-span-large-card">Poke-ID: ${pokeID}</span>
            <span class="type-span-large-card">Type: ${formattedType}</span>
            <span class="height-span large card">Height: ${pokemonHeight} cm  </span>
        </div>
        <div class="image-div-large-card">
            <img onclick="showPreviousCard('${pokemonName}')" class="backwards-button-styling" src="/img/arrow_back.svg">
            <img class="image-large-card" src="${pokemonImage}">
            <img onclick="showNextCard('${pokemonName}')" class="forward-button-styling" src="/img/arrow_forward.svg">
        </div>
        <div class="lower-section-large-card">
            <div class="lower-large-card-flex-container">
                <div class="about-div-large-card"> 
                    <span id="about-large-card-id" onclick="renderAboutSection('${pokemonName}')" class="about-span-styling">About</span>
                </div>    
                <div>
                    <span id="status-large-card-id" onclick="renderBaseStats('${pokemonName}')" class="stats-span-styling">Stats</span>
                </div>
            </div>
            <div id="lower-information-large-card">  
             
            </div>
        </div>
    </div>
    `
}

/**
 * Generates a template for the about section of a Pokémon.
 * @function aboutSectionTemplate
 * @param {number} pokemonWeight - The weight of the Pokémon.
 * @param {number} pokeID - The ID of the Pokémon.
 * @param {string} formattedType - The formatted type(s) of the Pokémon.
 * @param {number} pokemonHeight - The height of the Pokémon.
 * @param {number} baseExperience - The base experience of the Pokémon.
 * @param {string} formattedAbilities - The formatted abilities of the Pokémon.
 * @returns {Promise<string>} A promise that resolves to the generated template string.
 */
async function aboutSectionTemplate(pokemonWeight, pokeID, formattedType, pokemonHeight, baseExperience, formattedAbilities){
    return`
    <div class="rendered-about-section">
        <div class="about-lower-left-side">
            <div class="about-category-div">
                <span class="about-category-span">Weight:</span>
                <span class="about-value-span">${pokemonWeight} kg</span>
            </div>
            <div class="about-category-div">
                <span class="about-category-span">Poke-ID:</span>
                <span class="about-value-span">${pokeID}</span>
            </div>
            <div class="about-category-div">
                <span class="about-category-span">Type:</span>  
                <span class="about-value-span">${formattedType}</span>
            </div>
            <div class="about-category-div">
                <span class="about-category-span">Height:</span>
                <span class="about-value-span">${pokemonHeight} cm</span>

            </div>
            <div class="about-category-div">
                <span class="about-category-span">Base Experience:</span>
                <span class="about-value-span">${baseExperience} EP</span>
            </div>
            <div class="about-category-div">
                <span class="about-category-span">Abilities:</span>
                <span class="about-value-span">${formattedAbilities}</span>
            </div>
        </div>
    </div>
`
}

/**
 * Generates a template for a canvas container.
 * @function canvasContainerTemplate
 * @returns {Promise<string>} A promise that resolves to the generated template string.
 */
async function canvasContainerTemplate(){
    return`
    <div>
    <canvas id="pokemon-chart"></canvas>
    </div>
    `
}