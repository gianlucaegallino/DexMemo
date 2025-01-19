import sound from "../assets/click.mp3";
import "../styles/Card.css";

export default function Card({ text = "", imgurl = null, extraFunction = null }) {
  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  let imageElem;

  if (imgurl !== null) {
    imageElem = <img src={imgurl} alt={text}></img>;
  } else imageElem = "";

  return (
    <div className="card" onClick={()=>{
      playSound();
      extraFunction();
    }}>
      {imageElem}
      <p className="cardText">{text}</p>
    </div>
  );
}
