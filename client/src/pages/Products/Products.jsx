import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Products.css";
import heartIcon from "../../assets/heart-icon-black.png";
import sendIcon from "../../assets/send-icon.svg";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/wudzique/products/all")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        toast.error("Error fetching Products", err);
      });
  }, []);

  return (
    <>
      <div className="products">
        <ToastContainer />
        <Navbar />
        <div className="filters">
          <ul>
            <Category />
          </ul>
        </div>
        <div className="grid grid-cols-2 mt-[130px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-[1200px]  px-4">
          {products.map((product) => (
            <ProductItems key={product._id} product={product} />
          ))}
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

function ProductItems({ product }) {
  return (
    <>
      <div className="w-full h-[430px] border-[0.5px] backdrop-blur-[6px] p-4 bg-white/30 space-y-3 mt-5 mb-3 shadow-[0px_2px_6px_0px_#00000040]">
        <div className="w-full flex justify-center">
          <img
            src={product.mainImg}
            alt={product.name}
            className="h-64 m:h-48 md:h-56 lg:h-64 object-contain"
          />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-black font-[Outfit] font-medium text-2xl sm:text-2xl md:text-3xl lg:text-4xl truncate">
              <Link to={"/products/product"}>{product.name}</Link>
            </h2>
            <div className="flex gap-3">
              <img
                src={heartIcon}
                alt=""
                className="cursor-pointer w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
              />
              <img
                src={sendIcon}
                alt=""
                className="cursor-pointer w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain "
              />
            </div>
          </div>
          <p className="text-xl text-black sm:text-1.5xl md:text-2xl font-[Outfit] font-[300] text-[1.6rem]">
            Colour - {product.color}
          </p>
        </div>

        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <span className="bg-green-100 text-green-700 text-xl px-2 py-1 rounded-full">
            {product.averageRating}★
          </span>
          <span className="text-xl text-black font-[Outfit] font-[200] text-[1rem]">
            Ratings
          </span>
        </div>

        <div className="space-x-2 sm:space-x-3 md:space-x-4">
          <span className="font-bold text-black  font-[Outfit] text-2xl sm:text-3xl md:text-4xl">
            Rs.{product.price}
          </span>
          <span className="line-through text-gray-400 font-[Outfit] font-[300] text-xl sm:text-2xl md:text-2xl ">
            Rs.{product.originalPrice}
          </span>
          <span className="text-green-600 font-[Outfit] font-[500] text-xl sm:text-2xl md:text-2xl ">
            {product.discountPercent}%off
          </span>
        </div>

        <div className="flex flex-col  gap-3">
          <button className="flex-1 bg-[#7E4623] text-white py-2 rounded-[34px] hover:bg-[#633d24] transition-all duration-300 font-[Outfit] font-[500] text-[2.6rem] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
            Buy now
          </button>
          <button className="flex-1 bg-[#996541] text-white py-2 rounded-full hover:bg-[#633d24] transition-all duration-300 font-[Outfit] font-[500] text-[2.6rem] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}
