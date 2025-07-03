import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.svg';
import search from '../../assets/search-icon.svg';
import cart from '../../assets/cart-icon.svg';
import heart from '../../assets/heart-icon.svg';
import login from '../../Pages/Login/Login.jsx';
import profile from '../../assets/profile-icon.svg';
import orders from '../../assets/orders-icon.svg';
import history from '../../assets/history-icon.svg';
import wishlist from '../../assets/wishlist-icon.svg';
import logout from '../../assets/logout-icon.svg';
import loginIcon from '../../assets/login-icon.png';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
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
                        <li><Link to="/#hero">Home</Link></li>
                        <li><Link to="/#about">About Us</Link></li>
                        <li><Link to="#">Contact</Link></li>
                        <li><Link to="/login" id="login">Log in</Link></li>    
                        <li><Link to="#"  id="cart-icon"><img src={cart} alt="Cart"></img></Link></li>    
                        <li><Link to="#" id="heart-icon" alt="Wishlist"><img src={heart}></img></Link></li>    
                    </ul>
                </div>

                <div className='hamburger-wrapper' 
                onMouseEnter={() =>setMenuOpen(true)} 
                onMouseLeave={() => setMenuOpen(false)}>
                    <div class="hori-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>

                    {menuOpen && (
                        <div className='dropdown-menu'>
                            <ul>
                                {isLoggedIn ? (
                                    <>
                                        <li><img src={profile} alt='#' id='profile'></img>
                                        <Link to="#">Profile</Link></li>

                                        <li><img src={orders} alt='#' id='orders'></img>
                                        <Link to="#">My Orders</Link></li>

                                        <li><img src={history} alt='#' id='history'></img>
                                        <Link to='#'>History</Link></li>

                                        <li><img src={wishlist} alt='#' id='wishlist'></img>
                                        <Link to='#'>Wishlist</Link></li>

                                        <li><img src={logout} alt='#' id='logout'></img>
                                        <Link to='#' onClick={() => setIsLoggedIn(false)}>Logout</Link></li>
                                    </>
                                ) : (
                                    <li><img src={loginIcon} alt='#' id='login'></img><Link to="/login">Login</Link></li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                
            </nav>
        </section>
    </>
  );
}

export default Navbar;
