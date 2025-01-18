import { useEffect, useState } from "react";
import "../styles/GameBoard.css";
import Card from "./Card";

//Constant for the amount of pokemon, 1025 as of writing.
const POKEMON_AMOUNT = 1025;
const URL = "https://pokeapi.co/api/v2/pokemon/";



function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}  


async function requestPokemon(pokemonId) {
    try {
        const response = await fetch(URL + pokemonId, { mode: "cors" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const processed = await response.json();
        return processed;
      } catch (err) {
        console.error("Failed to fetch Pokémon:", err);
        throw err; // Re-throw the error for handling upstream
      }
}

async function getRandomPokemon(amount) {
    let selectedPokemon = [];
    for (let i = 0; i< amount; i++){
        //Generate random number
        let num = getRandomInt(1, POKEMON_AMOUNT+1);
        //use that number to request a pokemon
        let pokemon = await requestPokemon(num);
        //roll a shiny number and select image accordingly
        let image;
        if (getRandomInt(1, 4097) === 1) {
            image = pokemon.sprites.front_shiny; // 1 in 4097 chance for shiny
        } else {
            image = pokemon.sprites.front_default;
        }
        //
        let parsedPokemon = {
            name: pokemon.species.name,
            img: image
        }

        selectedPokemon.push(parsedPokemon);
    }
    console.log(selectedPokemon);
}

export default function GameBoard({amount = 6}) {
    const [currPokemon, setCurrPokemon] = useState({});
    
    useEffect(() => {
        let ignore = false;
        const pokemon = getRandomPokemon(amount);
        if (!ignore) {
            setCurrPokemon(pokemon);
        }
        return () => {
            ignore = true;
        };
    }, [amount]);


  return (
    <div className="gameboard">
      <Card text="Hey" />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card text="Hey" />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card text="Hey" />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
