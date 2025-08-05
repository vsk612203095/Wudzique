import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Background from "../../components/Background/Background.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import About from "../../components/About/About.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (location.hash === "#hero") {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <main className="content">
          <Background />
          <Navbar />
          <Hero />
          <About />
        </main>
        <Footer />
      </div>
    </>
  );
}
