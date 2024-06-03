/**
 * Renders a bar chart displaying Pokémon abilities.
  * @function renderChart
 * @param {number[]} abilities - An array containing the abilities of a Pokémon.
 * @returns {void} This function does not return a value.
 */
function renderChart(abilities) {
    let [hp, attack, defense, attackSp, defenseSp, speed] = abilities;
    let ctx = document.getElementById('pokemon-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
            datasets: [{
                label: 'Ability',
                data: [hp, attack, defense, attackSp, defenseSp, speed],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    min: 0,
                    max: 150,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}