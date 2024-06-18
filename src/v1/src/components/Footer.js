import React from "react";
import FooterCSS from "../css/Footer.module.css";

function Footer() {
  return (
    <div className={FooterCSS.footerContainer}>
      <p className={FooterCSS.footerText}>
        &copy; 2024 CodeQuestic. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
