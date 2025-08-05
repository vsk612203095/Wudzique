// import {Link} from 'react';
import "./Footer.css";
import instaIcon from "../../assets/insta-icon.png";

function Footer() {
  return (
    <>
      <section className="footer-container">
        <footer>
          <div className="footer-links">
            <h1>Who we are</h1>
            <span className="footer-line"></span>
            <ul>
              <li>
                <a href="./">Home</a>
              </li>
              <li>
                <a href="./#about">About Us</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <h1>Help</h1>
            <span className="footer-line"></span>
            <ul>
              <li>
                <a href="#">Cash on delivery</a>
              </li>
              <li>
                <a href="#">Customer Service</a>
              </li>
              <li>
                <a href="#">Free delivery</a>
              </li>
              <li>
                <a href="#">Rate & review</a>
              </li>
            </ul>
          </div>
          <div className="media">
            <div className="media-links">
              <h1>Follow Us</h1>
              <ul>
                <li>
                  <a href="#">
                    <img src={instaIcon} alt=""></img>
                  </a>
                </li>
              </ul>
            </div>
            <div className="t-c-links">
              <ul>
                <li>
                  <a href="#">Terms and Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
        <footer className="footer-span text-center text-white text-sm py-4">
          &copy; {new Date().getFullYear()} Wudzique. All rights reserved.
        </footer>
      </section>
    </>
  );
}

export default Footer;
