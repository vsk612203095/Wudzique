import './Hero.css';
import heroImage from '../../assets/figure.png';

function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>
                        <span className="hero-headline-script">Elevate</span>
                        <br />
                        <span className="hero-headline-serif">spaces naturally..</span>
                    </h1>
                    <p className="hero-description">
                        At Wudzique, we turn your ideas into handcrafted wood pieces that fit your lifestyle, your vision, and your vibe. Unique like you.
                    </p>
                    <button className="hero-btn">Explore now</button>
                </div>
                <div className="hero-image-wrapper">
                    <img src={heroImage} className="hero-image" alt="Buddha Wooden Art" />
                </div>
            </div>
        </section>
    );
}

export default Hero;