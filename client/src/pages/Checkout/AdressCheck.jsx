import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import lampImg from "../../assets/Product/leaf-clock.jpeg";

export default function AdressCheck() {
  return (
    <>
      <div className="w-full min-h-screen bg-[#ffffff] sm:px-8 py-6">
        <Navbar />
        {/* Progress Bar */}
        <div className="mt-[90px] flex justify-center items-center gap-8 sm:gap-16 text-2xl sm:text-4xl mb-8 font-[Inter] font-[700]">
          {["Cart", "Address", "Payment", "Success"].map((step, i) => (
            <div className="flex items-center gap-4" key={i}>
              <span className="w-5 h-5 rounded-full bg-black"></span>
              <span
                className={`font-medium ${
                  step === "Cart" ? "text-[#5B2C1D]" : "text-black"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:w-3/4 gap-10 lg:gap-20 px-6 mx-auto">
          {/* Left side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div>
              <h2 className="text-2xl sm:text-4xl mb-2 font-[Outfit] font-[500]">
                Delivery Address
              </h2>
              <div className="bg-[#EFE6E1] p-4 sm:p-8">
                <p className="text-gray-700 text-xl sm:text-2xl leading-relaxed font-[Outfit] font-[300]">
                  xxxxx, Pune 411 043 &nbsp; xxxxx, Pune 411 043 <br />
                  xxxxx, Pune 411 043 &nbsp; xxxxx, Pune 411 043
                </p>
                <button className="mt-4 px-4 py-2 border-[#FEF7E8] border-[2px] rounded-md text-[#5B2C1D] text-xl sm:text-2xl hover:bg-[#5B2C1D] hover:text-white transition">
                  Change Address
                </button>
              </div>
            </div>
            {/* Expected Delivery */}
            <div>
              <h2 className="text-2xl sm:text-4xl font-[Outfit] font-[500] mb-1">
                Expected Delivery
              </h2>
              <p className="text-gray-600 text-xl sm:text-2xl mb-2 font-[Outfit] font-[400] ">
                Estimated Delivery by Friday, 15 Aug
              </p>
            </div>
            <BuyItems />
            <BuyItems />
            <BuyItems />
          </div>
          {/* Right Side - Payment Summary */}
          <Payment />
        </div>
      </div>
    </>
  );
}

export function BuyItems() {
  return (
    <>
      <div className="flex items-center gap-4 bg-[#7E462329] p-4">
        <img
          src={lampImg}
          alt=""
          className="w-20 h-24 sm:w-40 sm:h-40 object-contain bg-[#FEF7E8] p-4"
        />
        <div>
          <p className="text-2xl sm:text-4xl font-[Outfit] font-[400]">
            Wooden Lamp
          </p>
          <p className="text-xl font-[Outfit] font-[400] text-gray-600">
            Colour – Wooden brown
          </p>
        </div>
      </div>
    </>
  );
}

export function Payment() {
  return (
    <>
      <div className="lg:max-h-fit bg-[#EAE1DC] p-4 sm:p-6 lg:col-span-1 space-y-6 lg:mt-8">
        <h2 className="text-2xl sm:text-4xl font-[Outfit] font-[500] mb-4">
          Payment summary
        </h2>
        <div className="flex-col justify-between space-y-2  text-2xl sm:text-3xl">
          <div className="flex justify-between">
            <span className="font-[Outfit] font-[300]">Total MRP</span>
            <span className="font-[Outfit] font-[400]">Rs. 500</span>
          </div>
          <hr className="my-2 border-[#FEF7E8]" />
          <div className="flex justify-between">
            <span className="font-[Outfit] font-[300]">Discount on MRP</span>
            <span className="font-[Outfit] font-[400] text-[#996C52]">
              - Rs. 200
            </span>
          </div>
          <hr className="my-2 border-[#FEF7E8]" />
          <div className="flex justify-between">
            <span className="font-[Outfit] font-[300]">Coupon savings</span>
            <span className="font-[Outfit] font-[400] text-[#996C52]">
              - Rs. 50
            </span>
          </div>
          <hr className="my-2 border-[#FEF7E8]" />
          <div className="flex justify-between">
            <span className="font-[Outfit] font-[300]">Delivery</span>
            <span className="font-[Outfit] font-[400] text-[#996C52]">
              Free
            </span>
          </div>
          <hr className="my-2 border-[#FEF7E8]" />
          <div className="flex justify-between font-[Outfit] font-[600]">
            <span>Total</span>
            <span>Rs. 300</span>
          </div>
        </div>

        <div className="text-center">
          <button className="w-72 h-16 mt-6 py-3 bg-[#7E4623] text-white rounded-full text-3xl font-[Outfit] font-[500] hover:bg-[#5B2C1D] transition">
            Pay
          </button>
        </div>
      </div>
    </>
  );
}
