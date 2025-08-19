import React, { useEffect, useState } from "react";
// import "./Navbar.css";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      <nav className="h-[80px] fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#110000] to-[#9A4309] shadow-md">
        <div className="py-6 max-w-full mx-auto px-4 sm:px-4 lg:px-6">
          <div className="flex items-center  h-20 gap-8 sm:gap-8 md:gap-12 lg:gap-20">
            <div className="flex items-center gap-4">
              <img src={logo} alt="" className="w-15 sm:w-20"></img>
              <h1 className="text-4xl md:text-3xl lg:text-4xl font-[Cinzel] font-[500] text-[#FFFFFF]">
                WUDZIQUE
              </h1>
            </div>

            <div className="hidden sm:flex items-center space-x-2 max-w-sm md:max-w-lg h-[42px] text-white font-[Inter] bg-[#7E4623] rounded-full px-3 sm:px-4 py-2">
              <img src={search} className="w-8 h-7 cursor-pointer" alt=""></img>
              <input
                type="text"
                className="bg-transparent text-white font-[Inter] font[400] placeholder-white outline-none flex-1 text-2xl md:text-3xl"
                placeholder="Search"
              />
            </div>

            <div className="hidden md:flex items-center space-x-0 text-white lg:gap-20 list-none text-2xl sm:text-2xl md:text-3xl font-[Inter] font-[400]">
              <Link
                to="/#hero"
                className=" hover:bg-[#7E4623] px-3 py-1 rounded-lg"
              >
                Home
              </Link>
              <Link
                to="/#about"
                className="hover:bg-[#7E4623] px-3 py-1 rounded-lg  lg:flex"
              >
                About
              </Link>
              <Link
                to="/#contact"
                className="hover:bg-[#7E4623] px-3 py-1 rounded-lg lg:flex"
              >
                Contact
              </Link>
              <Link
                to="/products"
                className="hover:bg-[#7E4623] px-3 py-1 rounded-lg"
              >
                Products
              </Link>
            </div>

            <div className="flex  items-center gap-16 cursor-pointer sm:gap-6 lg:gap-20">
              <Link to="/cart">
                <img
                  src={cartIcon}
                  alt=""
                  className="w-14 h-14 md:w-12 md:h-12 object-contain"
                ></img>
              </Link>
              <Link to="/wishlist">
                <img
                  src={heartIcon}
                  alt=""
                  className="w-13 h-15 md:w-11 md:h-10 object-contain"
                ></img>
              </Link>
            </div>

            {/* Dropdown Menu */}
            <div className="relative hidden md:block">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img src={dropdownIcon} alt=""></img>
              </button>
            </div>
            <div>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#864E26] rounded-3xl shadow-lg p-4 text-[#FEF7E8]">
                  <ul className="flex flex-col items-start gap-[1rem] font-[Outfit] font-[400]">
                    {loginStatus ? (
                      <>
                        <li className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]">
                          <img
                            src={profile}
                            alt="#"
                            className="w-[42px] h-[42px] object-contain"
                          ></img>
                          <Link to="/profile">Profile</Link>
                        </li>

                        <li className="flex items-center  gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]">
                          <img
                            src={orders}
                            alt="#"
                            id="orders"
                            className="w-[35px] h-[32px] object-contain"
                          ></img>
                          <Link to="/orders">Orders</Link>
                        </li>

                        <li className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]">
                          <img
                            src={history}
                            alt="#"
                            className="w-[36px] h-[36px] object-contain"
                          ></img>
                          <Link to="/history">History</Link>
                        </li>

                        <li className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]">
                          <img
                            src={wishlist}
                            alt="#"
                            className="w-[35px] h-[32px] object-contain"
                          ></img>
                          <Link to="/wishlist">Wishlist</Link>
                        </li>

                        <li className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]">
                          <img
                            src={logout}
                            alt="#"
                            className="w-[35px] h-[32px] object-contain"
                          ></img>
                          <Link to="/" onClick={handleLogout}>
                            Logout
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]">
                        <img
                          src={loginIcon}
                          alt=""
                          className="w-[35px] h-[32px] object-contain"
                        ></img>
                        <Link to="/register">Login</Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-whit"
              >
                <img
                  src={dropdownIcon}
                  alt=""
                  className="w-[28px] h-[28px]"
                ></img>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full right-4 w-80 bg-[#864E26] rounded-3xl shadow-lg p-4 text-[#FEF7E8] mt-[-2%] mr-10 z-100">
            <Link
              to="/#hero"
              className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
            >
              Home
            </Link>
            <Link
              to="/#about"
              className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
            >
              About
            </Link>
            <Link
              to="/#contact"
              className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
            >
              Contact
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
            >
              <img
                src={cartIcon}
                alt=""
                className="w-[35px] h-[32px] object-contain"
              ></img>
              Cart
            </Link>
            <div className="">
              {loginStatus ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
                  >
                    <img
                      src={profile}
                      alt="#"
                      className="w-[42px] h-[42px] object-contain"
                    ></img>
                    Profile
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
                  >
                    <img
                      src={wishlist}
                      alt="#"
                      className="w-[35px] h-[32px] object-contain"
                    ></img>
                    Wishlist
                  </Link>

                  <Link
                    to="/orders"
                    className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
                  >
                    <img
                      src={orders}
                      alt="#"
                      id="orders"
                      className="w-[35px] h-[32px] object-contain"
                    ></img>
                    Orders
                  </Link>

                  <Link
                    to="/history"
                    className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
                  >
                    <img
                      src={history}
                      alt="#"
                      className="w-[36px] h-[36px] object-contain"
                    ></img>
                    History
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
                  >
                    <img
                      src={logout}
                      alt="#"
                      className="w-[35px] h-[32px] object-contain"
                    ></img>
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/register"
                  className="flex items-center gap-[1rem] text-[2.8rem] font-[Outfit] font-[400]"
                >
                  <img
                    src={loginIcon}
                    alt=""
                    className="w-[35px] h-[32px] object-contain"
                  ></img>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
