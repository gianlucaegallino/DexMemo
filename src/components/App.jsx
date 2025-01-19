import { useState } from "react";
import "../styles/normalize.css";
import "../styles/App.css";
import ScoreBoard from "./ScoreBoard.jsx";
import GameBoard from "./GameBoard.jsx";
import Card from "./Card.jsx";
import ball from "../assets/ball.png";

function App() {
  // possible values: startscreen, playing, winscreen, losescreen
  const [gameStatus, setGameStatus] = useState("startscreen");
  const [highscore, setHighscore] = useState(0);

  //TODO: see if this works as it should, and any other variables shouldnt be reset
  function handleRestart() {
    setGameStatus("startscreen");
  }

  function handleStartEasy() {
    setGameStatus("playingeasy");
  }
  function handleStartMedium() {
    setGameStatus("playingmedium");
  }
  function handleStartHard() {
    setGameStatus("playinghard");
  }

  function handleWin() {
    setGameStatus("winscreen");
  }

  function handleLoss() {
    setGameStatus("losescreen");
  }


  // depending on game status, renders different things.

  let rendercontents;
  switch (gameStatus) {
    case "startscreen": {
      rendercontents = (
        <main className="startscreen">
          <h1>Select difficulty:</h1>
          <Card extraclass="easy" extraFunction={handleStartEasy} />
          <Card extraclass="medium" extraFunction={handleStartMedium} />
          <Card extraclass="hard" extraFunction={handleStartHard} />
        </main>
      );
      break;
    }
    case "playingeasy": {
      rendercontents = (
        <main className="playing">
          <GameBoard amount={6} />
          <ScoreBoard highscore={highscore} />
        </main>
      );
      break;
    }
    case "playingmedium": {
      rendercontents = (
        <main className="playing">
          <GameBoard amount={9} />
          <ScoreBoard highscore={highscore} />
        </main>
      );
      break;
    }
    case "playinghard": {
      rendercontents = (
        <main className="playing">
          <GameBoard amount={15} />
          <ScoreBoard highscore={highscore} />
        </main>
      );
      break;
    }
    case "winscreen": {
      rendercontents = (
        <main className="winscreen">
          <div className="container">
            <h1>You win!</h1>
            <h2>Try the other difficulties, if you dare...</h2>
            <Card
              imgurl={ball}
              text="Play again"
              extraFunction={handleRestart}
              extraclass="return"
            />
          </div>
        </main>
      );
      break;
    }
    case "losescreen": {
      rendercontents = (
        <main className="losescreen">
          <div className="container">
            <h1>You Lose...</h1>
            <h2>Try again!</h2>
            <Card
              imgurl={ball}
              text="Play again"
              extraFunction={handleRestart}
              extraclass="return"
            />
          </div>
        </main>
      );
      break;
    }
    default: {
      throw new Error("Undefined game status");
    }
  }


  //gameboard component.
  //effect that gets the amount of images based on diff
  //keep the amount of cards

  //hashmap to keep track of visited
  //add win condition

  return (
    <>
      <header className="topBar">
        <h1 className="title">MemoDex</h1>
      </header>
      {rendercontents}
    </>
  );
}

export default App;
