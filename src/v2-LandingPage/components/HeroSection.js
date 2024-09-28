import React from "react";
import HeroSectionCSS from "../css/HeroSection.module.css";
import HeroSectionImg from "../assets/herosectionImg.jpg";

function HeroSection() {
  return (
    <div className={HeroSectionCSS.heroContainer}>
      <div className={HeroSectionCSS.heroText}>
        <h1>Empowering Beginners, Benefiting the Community.</h1>
        <a
          href="https://github.com/CodeQuestic"
          target="_blank"
          rel="noopener noreferrer"
          className={HeroSectionCSS.buttonLink}
        >
          <button className={HeroSectionCSS.btn}>Join Us</button>
        </a>
      </div>
      <div className={HeroSectionCSS.heroImage}>
        <img src={HeroSectionImg} alt="Hero" />
      </div>
    </div>
  );
}

export default HeroSection;
