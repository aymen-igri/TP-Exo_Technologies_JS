#!/usr/bin/env node

import inquirer from 'inquirer';

async function fetchApi(endpoint) {
    const response = await fetch(`https://pokeapi.co/api/v2/${endpoint}`);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return await response.json();
}

// robot move: get a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fetch a Pokémon and select 5 valid moves (moves that deal damage/have power)
async function getPokemonData(query) {
    try {
        const pokemon = await fetchApi(`pokemon/${query.toString().toLowerCase()}`);
        console.log(`Loading moves for ${pokemon.name.toUpperCase()}...`);

        let validMoves = [];
        // Shuffle the moves to get a random assortment
        const shuffledMoves = pokemon.moves.sort(() => 0.5 - Math.random());

        for (const moveSlot of shuffledMoves) {
            if (validMoves.length >= 5) break;

            const moveData = await fetchApi(`move/${moveSlot.move.name}`);
            // Only select moves that have power (damaging moves)
            if (moveData.power !== null) {
                validMoves.push({
                    name: moveData.name,
                    power: moveData.power,
                    accuracy: moveData.accuracy || 100, // Some moves have null accuracy (always hit)
                    pp: moveData.pp
                });
            }
        }

        return {
            name: pokemon.name.toUpperCase(),
            hp: 300,
            moves: validMoves
        };
    } catch (e) {
        console.log("Could not find that Pokémon. Please check the name and try again.");
        return null;
    }
}

async function startGame() {
    console.log("=== WELCOME TO THE TERMINAL POKEMON BATTLE ===\n");

    //chooses Pokemon
    let playerPokemon = null;
    while (!playerPokemon) {

        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'pokemonName',
                message: 'Enter the name or ID of your Pokémon:'
            }
        ]);
        playerPokemon = await getPokemonData(answer.pokemonName);
    }

    // bot chooses random Pokemon
    console.log("\nOpponent is choosing a Pokémon...");
    let botPokemon = null;
    while (!botPokemon) {
        botPokemon = await getPokemonData(getRandomInt(1, 151));
    }

    console.log(`\nBATTLE START: ${playerPokemon.name} VS ${botPokemon.name}!\n`);

    // start game untill sombody lose
    while (playerPokemon.hp > 0 && botPokemon.hp > 0) {
        const moveChoices = playerPokemon.moves.map(move => {
            return {
                name: `${move.name.toUpperCase()} (Power: ${move.power}, ACC: ${move.accuracy}, PP: ${move.pp})`,
                value: move // This is the actual data you get back!
            };
        });

        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedMove',
                message: 'Choose your move:',
                choices: moveChoices
            }
        ]);
        const playerMove = answer.selectedMove;

        // Bot selects random move
        const botMove = botPokemon.moves[getRandomInt(0, botPokemon.moves.length - 1)];

        console.log(`\n> You chose ${playerMove.name.toUpperCase()}!`);
        console.log(`> Bot chose ${botMove.name.toUpperCase()}!\n`);

        // Execute attacks (Simultaneous Turn)

        // --- PLAYER ATTACK ---
        // If move's pp is lower than enemy's chosen move pp, attack fails
        if (playerMove.pp < botMove.pp) {
            console.log(`Your move has less PP (${playerMove.pp} vs ${botMove.pp}). Your attack was cancelled!`);
        } else {
            // Accuracy check
            const hitChance = getRandomInt(1, 100);
            if (hitChance <= playerMove.accuracy) {
                botPokemon.hp -= playerMove.power;
                console.log(`-> Your ${playerMove.name.toUpperCase()} hit the enemy for ${playerMove.power} damage!`);
            } else {
                console.log(`-> Your ${playerMove.name.toUpperCase()} missed!`);
            }
        }

        // --- BOT ATTACK ---
        // If move's pp is lower than enemy's chosen move pp, attack fails
        if (botMove.pp < playerMove.pp) {
            console.log(`Bot's move has less PP (${botMove.pp} vs ${playerMove.pp}). Bot's attack was cancelled!`);
        } else {
            // Accuracy check
            const hitChance = getRandomInt(1, 100);
            if (hitChance <= botMove.accuracy) {
                playerPokemon.hp -= botMove.power;
                console.log(`-> Bot's ${botMove.name.toUpperCase()} hit you for ${botMove.power} damage!`);
            } else {
                console.log(`-> Bot's ${botMove.name.toUpperCase()} missed!`);
            }
        }
    }

    //Declare Winner
    console.log(`\n============= GAME OVER =============`);
    if (playerPokemon.hp <= 0 && botPokemon.hp <= 0) {
        console.log("It's a draw!");
    } else if (playerPokemon.hp <= 0) {
        console.log("You lost! The bot wins this battle.");
    } else {
        console.log("Congratulations! You defeated the bot!");
    }
}

startGame();