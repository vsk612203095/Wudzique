// import "./Footer.css";
// import instaIcon from "../../assets/insta-icon.svg";
import twitIcon from "../../assets/twitter-icon.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-b from-[#5B2C1D] to-[#9C6B4D] text-white py-10 px-6">
        <div className="max-w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10  text-center">
          <div>
            <h3 className="text-2xl sm:text-5xl font-[Poppins] font-[400] mb-3 border-b border-white inline-block">
              Who we are
            </h3>
            <ul className="space-y-2 text-xl sm:text-2xl font-[Poppins] font-[400]">
              <li>
                <Link href="./">Home</Link>
              </li>
              <li>
                <Link href="./#about">About Us</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl sm:text-5xl font-[Poppins] font-[400] mb-3 border-b border-white inline-block">
              Help
            </h3>
            <ul className="space-y-2 text-xl sm:text-2xl font-[Poppins] font-[400]">
              <li>
                <Link to="/">Cash on delivery</Link>
              </li>
              <li>
                <Link to="/">Customer Service</Link>
              </li>
              <li>
                <Link to="/">Free delivery</Link>
              </li>
              <li>
                <Link to="/">Rate & review</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-2xl sm:text-5xl font-[Poppins] font-[400] mb-2">
              Follow Us
            </h1>
            <div className="flex justify-center sm:justify-center gap-2">
              <Link to="/" className="p-0 hover:text-[#5B2C1D]">
                <img
                  src={twitIcon}
                  alt=""
                  className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                ></img>
              </Link>
              <Link to="/" className="p-0 hover:text-[#5B2C1D]">
                <img
                  src={twitIcon}
                  alt=""
                  className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                ></img>
              </Link>
            </div>
          </div>
          <div>
            <ul className="space-y-2 text-xl sm:text-3xl font-[Poppins] font-[400]">
              <li>
                <Link to="/">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-xl sm:text-2xl font-[Poppins] font-[400] text-gray-200">
          &copy; {new Date().getFullYear()} Wudzique. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
