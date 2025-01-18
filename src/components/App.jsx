
import '../styles/normalize.css'
import '../styles/App.css'
import ScoreBoard from './ScoreBoard.jsx'
import GameBoard from './GameBoard.jsx'

function App() {
 //state selected difficulty



 //there should be a scoreboard component that takes in currscore and maxscore



 //gameboard component. 
  //effect that gets the amount of images based on diff 
  //keep the amount of cards
  //make card objects
  //implement fisher yates shuffle
  //hashmap to keep track of visited
  //add win condition

  return (
    <>
    <header className="topBar"><h1 className="title">PokeMemo</h1></header>
    <main>

      <GameBoard />
      <ScoreBoard />
    </main>
    </>
  )
}

export default App
