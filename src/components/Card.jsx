import sound from "../assets/click.mp3";
import "../styles/Card.css"

export default function Card({ text = "" }) {

  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  return (
    <div className="card" onClick={playSound}>
        <p className="cardText">{text}</p>
    </div>
  );
}
