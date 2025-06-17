import './Hero.css';
import heroImage from '../../assets/figure.png';


function Hero()
{
    return(
        <>
            <section className="hero container">
                
                <div className="hero-text">
                    <h1><i className="elevate">Elevate</i> <span>spaces naturally..</span></h1>
                    <p>At Wudzique, we turn your ideas into handcrafted wood pieces that fit your lifestyle, your vision, and your vibe. Unique like you.</p>
                    <button className="hero-btn">Explore now</button>
                </div>
                <img src={heroImage} className="hero-overlay-image" alt="Hero Design" />
            </section>
        </>
    );
}

export default Hero