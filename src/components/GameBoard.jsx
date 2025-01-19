import { useEffect, useState } from "react";
import "../styles/GameBoard.css";
import Card from "./Card";

//Constant for the amount of pokemon, 1025 as of writing, and the api URL.

const POKEMON_AMOUNT = 1025;
const URL = "https://pokeapi.co/api/v2/pokemon/";


//Utility function that returns an int in a range

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

//Api request function

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
    throw err;
  }
}

//Gets an amount of pokemon from the api and returns an array of objects

async function getRandomPokemon(amount) {
  let selectedPokemon = [];
  for (let i = 0; i < amount; i++) {
    //Generate random number
    let num = getRandomInt(1, POKEMON_AMOUNT + 1);
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
      name:
        pokemon.species.name.charAt(0).toUpperCase() +
        pokemon.species.name.slice(1),
      img: image,
      key: crypto.randomUUID(),
    };

    selectedPokemon.push(parsedPokemon);

  }
  //TODO: Remove this console log
  console.log(selectedPokemon);
  return selectedPokemon;
}

//Function implementing the Fisher-Yates shuffle algorithm

function fisherYatesShuffle(deck){
  const len = deck.length;
  for(let i = len-1; i > 0; i--){
    const j = getRandomInt(1, len-1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;

}

export default function GameBoard({ amount = 0 }) {
  const [currPokemon, setCurrPokemon] = useState([]);


  useEffect(() => {
    let ignore = false;
    async function managePokemon() {
      const pokemon = await getRandomPokemon(amount);
      if (!ignore) {
        setCurrPokemon(pokemon);
      }
    }
    managePokemon();
    return () => {
      ignore = true;
    };
  }, [amount]);


  const cardList = currPokemon.map((poke) => (
    <Card text={poke.name} imgurl={poke.img} key={poke.key} />
  ));


  return <div className="gameboard">{cardList}</div>;
}
