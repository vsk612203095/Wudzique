import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Products.css";
import heartIcon from "../../assets/heart-icon-black.png";
import sendIcon from "../../assets/send-icon.svg";
import lampImg from "../../assets/c-lamp.jpeg";
import { useState } from "react";
// import {products} from '../../Data/products.js';

export default function Product() {
  return (
    <>
      <div className="products">
        <Navbar />
        <div className="filters">
          <ul>
            <Category />
          </ul>
        </div>
        <div className="grid grid-cols-2 mt-[130px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-[1200px]  px-4">
          <ProductItems />
          <ProductItems />
          <ProductItems />
          <ProductItems />
          <ProductItems />
        </div>
      </div>
    </>
  );
}

function Category() {
  return (
    <>
      <li className="active">
        <button>All</button>
      </li>
      <li>
        <button>Clocks</button>
      </li>
      <li>
        <button>Showpieces</button>
      </li>
      <li>
        <button>Stands</button>
      </li>
      <li>
        <button>Lamps</button>
      </li>
    </>
  );
}

function ProductItems() {
  return (
    <>
      <div className="w-full h-[430px] border-[0.5px] backdrop-blur-[6px] p-4 bg-white/30 space-y-3 mt-5 mb-3 shadow-[0px_2px_6px_0px_#00000040]">
        <div className="w-full flex justify-center">
          <img
            src={lampImg}
            alt="Wooden Lamp"
            className="h-64 object-contain"
          />
        </div>

        <div>
          <div className="heading flex justify-between items-center overflow-hidden">
            <h2 className="text-black font-[Outfit] font-[500] text-[2.2rem]">
              Wooden Lamp
            </h2>
            <div className="flex justify-between text-xl gap-3 right-4">
              <img
                src={heartIcon}
                alt=""
                className="cursor-pointer w-8 h-8 object-contain"
              />
              <img
                src={sendIcon}
                alt=""
                className="cursor-pointer w-8 h-8 object-contain "
              />
            </div>
          </div>
          <p className="text-sm text-black font-[Outfit] font-[300] text-[1.6rem]">
            Colour - Wooden brown
          </p>
        </div>

        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
            4.8★
          </span>
          <span className="text-sm text-black font-[Outfit] font-[200] text-[1rem]">
            Ratings
          </span>
        </div>

        <div className="space-x-2 text-[16px]">
          <span className="font-bold text-black  font-[Outfit] font-[500] text-[2.4rem]">
            Rs. 300
          </span>
          <span className="line-through text-gray-400 font-[Outfit] font-[300] text-[1.4rem] ">
            Rs. 500
          </span>
          <span className="text-green-600 font-[Outfit] font-[500] text-[1.2rem] ">
            60% off
          </span>
        </div>

        <div className="flex flex-col gap-4 pt-0">
          <button className=" bg-[#7E4623] text-white py-2 rounded-[34px] hover:bg-[#633d24] transition-all duration-300 font-[Outfit] font-[500] text-[2.6rem] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
            Buy now
          </button>
          <button className="bg-[#996541] text-white py-2 rounded-full hover:bg-[#633d24] transition-all duration-300 font-[Outfit] font-[500] text-[2.6rem] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}
