import "../styles/ScoreBoard.css"
export default function ScoreBoard({ score = 0, highscore = 0}){
    return (
        <div className="scoreboard">
            <h2>Score:</h2>
            <p className="bignumber">{score}</p>
            <h3>Highscore:</h3>
            <p className="smallnumber">{highscore}</p>
        </div>
    )
}