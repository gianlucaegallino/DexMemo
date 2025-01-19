import { useEffect, useState } from "react";
import "../styles/GameBoard.css";
import Card from "./Card";

//Constant for the amount of pokemon, 1025 as of writing, and the api URL.

const POKEMON_AMOUNT = 1025;
const URL = "https://pokeapi.co/api/v2/pokemon/";

//Utility function that returns an int in a range (Min inclusive, Max exclusive)

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
  let selectedIds = new Map();

  for (let i = 0; i < amount; i++) {
    //Generate random number
    let num = getRandomInt(1, POKEMON_AMOUNT + 1);

    //makes sure there are no repeat mons

    while (selectedIds.has(num)) {
      num = getRandomInt(1, POKEMON_AMOUNT + 1);
    }

    //adds the number to the set
    selectedIds.set(num, 1);

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
      selected: false,
    };

    selectedPokemon.push(parsedPokemon);
  }
  return selectedPokemon;
}

//Function implementing the Fisher-Yates shuffle algorithm

function fisherYatesShuffle(deck) {
  const len = deck.length;

  for (let i = len - 1; i > 0; i--) {
    const j = getRandomInt(0, i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function GameBoard({
  amount = 0,
  winFunct = () => {},
  loseFunct = () => {},
  scoreFunct = () => {},
}) {
  const [currPokemon, setCurrPokemon] = useState([]);

  //Function to handle card clicks

  function handleCardClick(eventName) {
    let curr = [...currPokemon];

    //finds the index of the clicked mon
    const pos = curr.map((e) => e.name).indexOf(eventName);

    //checks or sets the pokemon selected status and adds score
    if (!curr[pos].selected) {
      curr[pos].selected = true;
      scoreFunct();
    } else {
      //handles loss
      loseFunct();
    }

    //checks for a win condition
    checkForWin(curr);

    //shuffles pokemon
    let newState = fisherYatesShuffle(curr);
    setCurrPokemon(newState);
  }

  function checkForWin(array) {
    let won = true;

    array.forEach((element) => {
      if (!element.selected) won = false;
    });

    if (won) winFunct();
  }

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
    <Card
      text={poke.name}
      imgurl={poke.img}
      key={poke.key}
      extraFunction={handleCardClick}
    />
  ));

  return <div className="gameboard">{cardList}</div>;
}
