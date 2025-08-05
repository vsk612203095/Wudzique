import "./Hero.css";
import heroImage from "../../assets/figure.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-text">
          <h1>
            <i id="i1">Elevate</i> <i id="i2">spaces naturally..</i>
          </h1>
          <p>
            At Wudzique, we turn your ideas into handcrafted wood pieces that
            fit your lifestyle, your vision, and your vibe. Unique like you.
          </p>
          <button className="hero-btn">
            <Link to="/products">Explore now</Link>
          </button>
        </div>
        <img src={heroImage} className="hero-overlay" alt="Hero Design" />
      </section>
    </>
  );
}
