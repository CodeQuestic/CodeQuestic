import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderCSS from "../css/Header.module.css";
import { Slant as Hamburger } from "hamburger-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={HeaderCSS.header}>
        <div>
          <Link to="/" className={HeaderCSS.logotext}>
            CodeQuestic
          </Link>
        </div>
        <div className={HeaderCSS.menuIcon}>
          <Hamburger toggled={menuOpen} toggle={toggleMenu} />
        </div>
        <ul
          className={`${HeaderCSS.ulist} ${menuOpen ? HeaderCSS.menuOpen : ""}`}
        >
          <li className={HeaderCSS.list}>
            <Link to="/" className={HeaderCSS.atag}>
              Home
            </Link>
          </li>
          <li className={HeaderCSS.list}>
            <a
              href="https://github.com/CodeQuestic"
              target="_blank"
              rel="noopener noreferrer"
              className={HeaderCSS.atag}
            >
              GitHub
            </a>
          </li>
          <li className={HeaderCSS.list}>
            <a
              href="https://discord.gg/33VBS64Ju5"
              target="_blank"
              rel="noopener noreferrer"
              className={HeaderCSS.atag}
            >
              Discord
            </a>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
