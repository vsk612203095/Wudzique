import './About.css';
import cod from '../../assets/cash-on-delivery-icon.svg';
import service from '../../assets/customer-service-icon.svg';
import delivery from '../../assets/delivery-icon.svg';
import rating from '../../assets/rate-icon.svg';
import arrow from '../../assets/down-arrow-icon.svg';

function About(){
    return(
        <>
            <section className='about-container container' id='about'>
                <div className='about-details'>
                    <div className='about-text'>
                        <h1>About Us</h1>
                        <p>A special collection of beautifully handcrafted wooden products made with care and skill. These pieces are made from high-quality wood and designed to add a touch of elegance & warmth to your space.</p>
                    </div>
                    <div className='about-image'>
                        <img src="" alt='about'></img>
                    </div>
                </div>
                <div className='about-policies'>
                    <ul>
                        <li>
                            <img src={cod} alt='cash-on-delivery'></img>
                            <h1>Cash On Delivery</h1>
                            <a href='#'><img src={arrow} alt='more...'></img></a>
                        </li>
                        <li>
                            <img src={service} alt='customer-serviced'></img>
                            <h1>Customer Service</h1>
                            <a href='#'><img src={arrow} alt='more...'></img></a>
                        </li>
                        <li>
                            <img src={delivery} alt='free-delivery'></img>
                            <h1>Free Delivery</h1>
                            <a href='#'><img src={arrow} alt='more...'></img></a>
                        </li>
                        <li>
                            <img src={rating} alt='rate-nd-reviews'></img>
                            <h1>Rate & Review</h1>
                            <a href='#'><img src={arrow} alt='more...'></img></a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default About