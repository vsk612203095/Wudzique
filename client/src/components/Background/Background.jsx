import "./Background.css";
import background from "../../assets/background.png";

export default function Background() {
  return (
    <>
      <div className="background-img">
        <img src={background} alt="" className="background"></img>
      </div>
    </>
  );
}
