import "./About.css";
import cod from "../../assets/cash-on-delivery-icon.svg";
import service from "../../assets/customer-service-icon.svg";
import delivery from "../../assets/delivery-icon.svg";
import rating from "../../assets/rate-icon.svg";
import arrow from "../../assets/down-arrow-icon.svg";
import infoImg from "../../assets/info-img.png";
import rareIcon from "../../assets/rare-wood.png";
import limitedIcon from "../../assets/limited-ed.png";
import handmadeIcon from "../../assets/handmade.png";
import customIcon from "../../assets/customizable.png";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <section className="w-full flex flex-col" id="about">
        <div className="md:h-[300px] flex flex-col md:flex-row items-center justify-around w-full bg-[#5B2C0F] px-6 py-10">
          <div className="w-full md:w-1/2 text-center md:text-center font-[Outfit] font-[200] text-[#B2B2B2] text-3xl sm:text-5xl md:text-5xl">
            <h1 className="font-[Philosopher] text-[4.5rem] sm:text-[6.5rem]  lg:text-[8.5rem]  font-[400] text-[#CAAA93] mb-4">
              About Us
            </h1>
            <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-[Outfit] font-[200] text-[#BCB2B2]">
              A special collection of beautifully handcrafted wooden products
              made with care and skill. These pieces are made from high-quality
              wood and designed to add a touch of elegance & warmth to your
              space.
            </p>
          </div>
        </div>
        <div className="px-4 w-full min-h-[170px] sm:min-h-[300px] md:min-h-[400px] bg-[#391509]">
          <ul className="flex flex-row sm:row-span-2 md:row-span-2 justify-center gap-3 sm:gap-8 md:gap-8 px-4">
            {[
              { icon: cod, title: "Cash On Delivery" },
              { icon: service, title: "Customer Service" },
              { icon: delivery, title: "Free Delivery" },
              { icon: rating, title: "Rate & Review" },
            ].map((item, i) => (
              <li
                key={i}
                className="bg-[#966341] w-52 h-64 sm:w-80 sm:h-[250px] md:h-[350px] md:w-[250px] -mt-8 sm:-mt-8 md:-mt-20  rounded-[30px] sm:rounded-[40px] md:rounded-[70px] shadow-[5px_13px_4px_0px_#00000040] flex flex-col items-center justify-center text-center"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-20 h-20 sm:w-[100px] sm:h-[100px]  md:w-[128px] md:h-[128px] mb-4  object-contain"
                />
                <h1 className="font-[Inter] font-[700] text-white text-lg sm:text-2xl  md:text-3xl mb-1">
                  {item.title}
                </h1>
                <Link to="/">
                  <img src={arrow} alt="more" className="w-8 h-8" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="w-full md:h-[600px] bg-gradient-to-b from-[#744628] to-[#2B0C02] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-6">
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="font-[Philosopher] font-[100] text-[3.5rem] sm:text-[5rem] md:text-[8rem] text-[#F7E2D3]">
            Where Art Meets Wood...
          </h1>
          <p className="font-[Outfit] font-[200] text-xl sm:text-3xl md:text-4xl text-white sm:pl-3">
            A special collection of beautifully handcrafted wooden products made
            with care and skill. These pieces are made from high-quality wood
            and designed to add a touch of elegance & warmth to your space.
          </p>
          <ul className="flex flex-wrap justify-center lg:justify-start gap-6 mt-6">
            <li className="flex flex-col items-center font-[Philosopher] font-[400] text-white text-xl sm:text-2xl lg:text-3xl gap-4">
              <img
                src={rareIcon}
                alt=""
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#8C6946]"
              ></img>
              <span>Rare wood</span>
            </li>
            <li className="flex flex-col items-center font-[Philosopher] font-[400] text-white text-xl sm:text-2xl lg:text-3xl gap-4">
              <img
                src={limitedIcon}
                alt=""
                className="w-14 h-14 object-contain sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#8C6946]"
              ></img>
              <span>Limited Edition</span>
            </li>
            <li className="flex flex-col items-center font-[Philosopher] font-[400] text-white text-xl sm:text-2xl lg:text-3xl gap-4">
              <img
                src={handmadeIcon}
                alt=""
                className="w-14 h-14 sm:w-16 sm:h-16  md:w-20 md:h-20 rounded-full bg-[#8C6946]"
              ></img>
              <span>Hand finished</span>
            </li>
            <li className="flex flex-col items-center font-[Philosopher] font-[400] text-white text-xl sm:text-2xl lg:text-3xl gap-4">
              <img
                src={customIcon}
                alt=""
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-full bg-[#8C6946]"
              ></img>
              <span>Customizable</span>
            </li>
          </ul>
        </div>
        <div className="lg:mt-0 flex justify-center lg:justify-end w-full lg:w-1/2">
          <img
            src={infoImg}
            alt=""
            className="w-64 sm:w-80 lg:w-[400px] h-auto object-contain"
          ></img>
        </div>
      </section>
    </>
  );
}
