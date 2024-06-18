import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <h2
        style={{
          padding: "20px",
          textAlign: "center",
          color: "white",
          fontWeight: "500",
          letterSpacing: "3px",
        }}
      >
        Innovate | Iterate | Inspire
      </h2>
      <Footer />
    </div>
  );
}

export default LandingPage;
