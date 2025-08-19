// import "./Background.css";
import background from "../../assets/background.png";

export default function Background() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[790px] -z-10 overflow-hidden">
        <img
          src={background}
          alt=""
          className="w-full h-full object-cover object-bottom"
        ></img>
      </div>
    </>
  );
}
