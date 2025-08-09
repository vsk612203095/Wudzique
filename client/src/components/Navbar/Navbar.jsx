import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import search from "../../assets/search-icon.svg";
import cartIcon from "../../assets/cart-icon.svg";
import heartIcon from "../../assets/heart-icon.svg";
import dropdownIcon from "../../assets/dropdown-icon.svg";
import profile from "../../assets/profile-icon.svg";
import orders from "../../assets/orders-icon.svg";
import history from "../../assets/history-icon.svg";
import wishlist from "../../assets/wishlist-icon.svg";
import logout from "../../assets/logout-icon.svg";
import loginIcon from "../../assets/login-icon.png";
import { Link } from "react-router-dom";
export default function Navbar() {
  let [menuOpen, setMenuOpen] = useState(false);
  let [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setLoginStatus(status);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoginStatus(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo"></img>
          <h1 className="brand-name">WUDZIQUE</h1>
        </div>
        <div className="search-container">
          <img src={search} className="search-icon" alt=""></img>
          <input type="text" id="search-input" placeholder="Search" />
        </div>
        <div className="nav-links">
          <ul>
            <li className="active">
              <Link to="/#hero">Home</Link>
            </li>
            <li>
              <Link to="/#about">About</Link>
            </li>
            <li>Contact</li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">
                <img src={cartIcon} alt="" id="cart-icon"></img>
              </Link>
            </li>
            <li>
              <Link to="/wishlist">
                <img src={heartIcon} alt="" id="heart-icon"></img>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="menu-wrapper"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <img src={dropdownIcon} alt=""></img>
          {menuOpen && (
            <div className="dropdown-menu">
              <ul>
                {loginStatus ? (
                  <>
                    <li>
                      <img src={profile} alt="#" id="profile"></img>
                      <Link to="/profile">Profile</Link>
                    </li>

                    <li>
                      <img src={orders} alt="#" id="orders"></img>
                      <Link to="/orders">My Orders</Link>
                    </li>

                    <li>
                      <img src={history} alt="#" id="history"></img>
                      <Link to="/history">History</Link>
                    </li>

                    <li>
                      <img src={wishlist} alt="#" id="wishlist"></img>
                      <Link to="/wishlist">Wishlist</Link>
                    </li>

                    <li>
                      <img src={logout} alt="#" id="logout"></img>
                      <Link to="/" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <img src={loginIcon} alt="" id="login"></img>
                    <Link to="/register">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
