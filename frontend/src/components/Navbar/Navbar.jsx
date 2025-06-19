import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.svg';
import search from '../../assets/search-icon.svg';
import cart from '../../assets/cart-icon.svg';
import heart from '../../assets/heart-icon.svg';

function Navbar() {
  return (
    <>
        <section className="navbar-container container">
            <nav className="navbar container">
                <div className="logo">
                    <img src={logo} alt='logo'></img>
                    <h1 className="brand-name">WUDZIQUE</h1>
                </div>
                <div class="search-container">
                    <img src={search} className='search-icon'></img>
                    <input type="text" id="search-input" placeholder="Search"/>
                </div>
  
                <div className="nav-links">
                    <ul className="nav-items">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#" id="login">Log in</a></li>    
                        <li><a href="#" id="cart-icon"><img src={cart} alt="Cart"></img></a></li>    
                        <li><a href="#" id="heart-icon" alt="Wishlist"><img src={heart}></img></a></li>    
                    </ul>
                </div>
                
                <div class="hori-lines">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>
            </nav>
        </section>
    </>
  );
}

export default Navbar;
