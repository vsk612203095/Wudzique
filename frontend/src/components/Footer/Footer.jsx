// import {Link} from 'react';
import './Footer.css';


function Footer(){
    return(
            <>
                <section className='footer-container container'>
                <div className='footer-home-links'>
                    <h1>Who we are</h1>
                    <span className='footer-line'></span>
                    <ul>
                        <li>
                            <a href='./'>Home</a>
                        </li>
                        <li>
                            <a href='./#about'>About Us</a>
                        </li>
                        <li>
                            <a href='#'>Products</a>
                        </li>
                        <li>
                            <a href='#'>Contact</a>
                        </li>
                    </ul>
                </div>
                <div className='footer-policy-links'>
                    <h1>Help</h1>
                    <span className='footer-line'></span>
                    <ul>
                        <li>
                            <a href='#'>Cash on delivery</a>
                        </li>
                        <li>
                            <a href='#'>Customer Service</a>
                        </li>
                        <li>
                            <a href='#'>Free delivery</a>
                        </li>
                        <li>
                            <a href='#'>Rate & review</a>
                        </li>
                    </ul>

                </div>
                <div className='social-media-links'>
                    <h1>Follow Us</h1>
                    <ul>
                        <li>
                            <a href='#'>Insta</a>
                        </li>
                    </ul>
                </div>
                <div className='t-and-c'>
                    <ul>
                        <li> <a href="#">Terms and Conditions</a></li>
                        <li><a href='#'>Privacy Policy</a></li>    
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Footer;

