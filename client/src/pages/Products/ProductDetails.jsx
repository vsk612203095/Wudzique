import "./ProductDetails.css";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import lampImg from "../../assets/c-lamp.jpeg";
import returnIcon from "../../assets/return-icon.svg";
import truckIcon from "../../assets/truck-icon.svg";
import locationIcon from "../../assets/location-icon.svg";
import heartIcon from "../../assets/heart-icon-black.svg";
import sendIcon from "../../assets/send-icon.svg";
// import { useParams } from "react-router-dom";
// import axios from "axios";

export default function ProductDetails() {
  const product = {
    name: "Wooden Lamp",
    color: "Wooden brown",
    price: 300,
    oldPrice: 500,
    discount: "60% off",
    rating: 4.8,
    details: {
      Material: "High-quality resin (idol) and engineered wood (frame)",
      Lighting: "Built-in warm LED light",
      "Idol Color": "Matte black with gold detailing (flute)",
      "Frame Finish": "Natural wood grain",
      Type: "Tabletop décor / Showpiece",
      "Plug type": "USB / Adapter-powered (if applicable)",
    },
    images: [lampImg, lampImg, lampImg, lampImg], // Sample images
    deliveryDate: "Tuesday, 8 July",
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <>
      <Navbar />
      <div className="max-w-[1500px] mt-[60px] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT: Images */}
        <div>
          <div className="border p-4 flex justify-center bg-[#D9D9D9]">
            <img
              src={selectedImage}
              alt={product.name}
              className="object-contain h-[450px]"
            />
          </div>
          <div className="flex gap-5 mt-4">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className={`border cursor-pointer p-1 ${
                  selectedImage === img ? "border-white" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="h-[127px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="">
          <h1 className=" text-black  font-[Outfit] text-[4rem] font-[500]">
            {product.name}
          </h1>
          <div className=" flex  items-center gap-2 mr-10">
            <img src={heartIcon} alt="" className="h-[27px] w-[27px]" />
            <img src={sendIcon} alt="" className="h-[30px] w-[30px]" />
          </div>

          <p className=" text-black  font-[Outfit] text-[2.3rem] font-[300]">
            Colour - {product.color}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <span className="bg-[#408C42] text-white px-3 py-1 rounded-full font-[Outfit] font-[500] text-[2rem] w-[81px] h-[31px] text-center">
              {product.rating} ★
            </span>
            <span className=" text-black  font-[Outfit] text-[1.6rem] font-[200]">
              Ratings
            </span>
          </div>

          {/* Price */}
          <div className="space-x-3">
            <span className=" text-black  font-[Outfit] text-[3.2rem] font-[600]">
              Rs. {product.price}
            </span>
            <span className="line-through  text-black  font-[Outfit] text-[2rem] font-[300]">
              Rs. {product.oldPrice}
            </span>
            <span className="text-[#408c42] font-[Outfit] text-[2rem] font-[500]">
              {product.discount}
            </span>
          </div>

          {/* Product Details */}
          <div className="mb-4">
            <h2 className=" text-black  font-[Outfit] text-[2.4rem] font-[500]">
              Product details
            </h2>
            <ul className=" text-black  font-[Outfit] text-[2rem] font-[300] list-none">
              {Object.entries(product.details).map(([key, value], idx) => (
                <li key={idx}>
                  <span className=" text-black  font-[Outfit] text-[2rem] font-[500]">
                    {key}:
                  </span>{" "}
                  {value}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[600px]">
            <button className="flex-1 text-white font-[Outfit] text-[2.8rem] sm:text-[2.8rem] md:text-[2.8rem] lg:text-[2.8rem] font-medium shadow-[4px_4px_4px_0px_#00000040] bg-[#996541] py-3 sm:py-4 rounded-full hover:bg-[#633d24] transition">
              Add to cart
            </button>
            <button className="flex-1 text-white font-[Outfit] text-[2.8rem] sm:text-[2.8rem] md:text-[2.8rem] lg:text-[2.8rem] font-medium shadow-[4px_4px_4px_0px_#00000040] bg-[#7E4623] py-3 sm:py-4 rounded-full hover:bg-[#633d24] transition">
              Buy now
            </button>
          </div>
          {/* Extra Info */}
          <div className="delivery-items mb-[30px]">
            <ul>
              <li>
                <img src={returnIcon} alt=""></img>
                <span>10 Days</span>
                <span>Returnable</span>
              </li>
              <li>
                <img src={truckIcon} alt=""></img>
                <span>Free</span>
                <span>Delivery</span>
              </li>
            </ul>
          </div>
          <div className="delivery-details pl-7">
            <span className=" text-black  font-[Outfit] text-[2.8rem] font-[600]">
              Rs. 300
            </span>
            <p className="text-black  font-[Outfit] text-[1.6rem] font-[400]">
              FREE Delivery, {/*<strong>{product.deliveryDate}</strong> */}
            </p>
            <span className="text-black  font-[Outfit] text-[1.4rem] font-[400]">
              <img src={locationIcon} alt=""></img>Delivering to Pune, 411 043
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
