import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaSignOutAlt, FaBox, FaHistory, FaStar } from 'react-icons/fa';
import logo from '../../assets/logo.svg';
import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const { getCartItemCount } = useCart();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleLogout = async () => {
        await logout();
        setMenuOpen(false);
        navigate('/');
    };

    const cartItemCount = getCartItemCount();

    return (
        <section className="navbar-container">
            <nav className="navbar">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <img src={logo} alt="Wudzique Logo" style={{ height: '38px', marginRight: '0.5em' }} />
                        <span className="brand-name">WUDZIQUE</span>
                    </Link>
                </div>
                <form onSubmit={handleSearch} className="search-container">
                    <FaSearch className='search-icon' />
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
                <div className="nav-links">
                    <ul className="nav-items">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        {!isAuthenticated && (
                            <li><Link to="/login" className="login-link">Log in</Link></li>
                        )}
                        <li>
                            <Link to="/cart" className="cart-link">
                                <FaShoppingCart />
                                {cartItemCount > 0 && (
                                    <span className="cart-badge">{cartItemCount}</span>
                                )}
                            </Link>
                        </li>
                        <li>
                            <Link to="/wishlist" className="wishlist-link">
                                <FaHeart />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={`hamburger-wrapper${menuOpen ? ' open' : ''}`}
                    onMouseEnter={() => setMenuOpen(true)}
                    onMouseLeave={() => setMenuOpen(false)}>
                    <div className="hori-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                    {menuOpen && (
                        <div className='dropdown-menu'>
                            <ul>
                                {isAuthenticated ? (
                                    <>
                                        <li className="user-info">
                                            <FaUser className="menu-icon" />
                                            <span>Profile</span>
                                        </li>
                                        <li>
                                            <FaBox className="menu-icon" />
                                            <span>My Orders</span>
                                        </li>
                                        <li>
                                            <FaHistory className="menu-icon" />
                                            <span>History</span>
                                        </li>
                                        <li>
                                            <FaStar className="menu-icon" />
                                            <span>Wishlist</span>
                                        </li>
                                        <li>
                                            <FaSignOutAlt className="menu-icon" />
                                            <button onClick={handleLogout} className="logout-btn">
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <FaUser className="menu-icon" />
                                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </section>
    );
}

export default Navbar;
