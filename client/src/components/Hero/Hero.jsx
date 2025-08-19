import "./Hero.css";
import heroImage from "../../assets/figure.png";
import { Link } from "react-router-dom";
import background from "../../assets/background.png";

export default function Hero() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <img
          src={background}
          alt=""
          className="w-full h-full object-cover object-bottom"
        ></img>
      </div>
      <section
        className="mt-20 lg:mt-0 relative w-full  flex items-center justify-between px-6 sm:px-10 lg:px-20 py-6"
        id="hero"
      >
        <div className=" mt-10 max-w-full lg:max-w-[50%] z-10 text-left lg:text-left">
          <h1 className="flex flex-col items-start gap-0">
            <i
              id="i1"
              className="font-[Playball] font-[400] text-[4rem] sm:text-[12rem] lg:text-[15rem] xl:text-[12rem] text-[#B29784] leading-none pl-[10%]"
            >
              Elevate
            </i>
            <i
              id="i2"
              className="font-[Philosopher]  font-[400] text-[2.5rem] sm:text-[6rem] md:text-[7.5rem] xl:text-[7.5rem] text-[#FFFFFF] leading-tight pl-[10%]"
            >
              spaces naturally..
            </i>
          </h1>
          <p className="mt-4 text-[#B09885] font-[Prata] font-[400] text-[1.5rem] sm:text-[1.5rem] lg:text-3xl xl:text-[2rem] max-w-[90%] lg:max-w-full  pl-[10%]">
            At Wudzique, we turn your ideas into handcrafted wood pieces that
            fit your lifestyle, your vision, and your vibe. Unique like you.
          </p>
          <button className="hero-btn bg-[#7E4623] hover:bg-[#633d24] text-white font-[Outfit] text-lg sm:text-xl lg:text-2xl px-6 py-2 rounded-full mt-6 transition duration-300">
            <Link to="/products">Explore now</Link>
          </button>
        </div>
        <div className="hidden md:absolute lg:relative lg:flex justify-end lg:w-1/2 mt-10 lg:mt-0">
          <img
            src={heroImage}
            className="w-130 h-130 object-contain mx-auto lg:ml-30 mt-40"
            alt="Hero Design"
          />
        </div>
      </section>
    </>
  );
}
