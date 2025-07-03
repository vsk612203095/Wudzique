import './Hero.css';
import heroImage from '../../assets/figure.png';


function Hero()
{
    return(
        <>
            <section className="hero container" id='hero'>
                
                <div className="hero-text">
                    <h1><i id="i1">Elevate</i> <i id='i2'>spaces naturally..</i></h1>
                    <p>At Wudzique, we turn your ideas into handcrafted wood pieces that fit your lifestyle, your vision, and your vibe. Unique like you.</p>
                    <button className="hero-btn">Explore now</button>
                </div>
                <img src={heroImage} className="hero-overlay-image" alt="Hero Design" />
            </section>
        </>
    );
}

export default Hero