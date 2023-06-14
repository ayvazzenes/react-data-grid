import React, { useState } from "react";
import appLogo from "../../assets/logos/app-logo.png";
import logoYoutube from "../../assets/icons/logo-youtube.png";
import logoInstagram from "../../assets/icons/logo-instagram.png";
import logolinkedın from "../../assets/icons/logo-linkedln.png";
import logoBehance from "../../assets/icons/logo-behance.png";
import "./Header.css";

const Header = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  //sayfa responsive olunca sidebarı aktif etme
  const handleSidebar = () => {
    setOpenSideBar((prevOpenSidebar) => !prevOpenSidebar);
  };
  return (
    <header className="app-header">
      <nav className="app-navbar container">
        <div className="app-logo">
          <img src={appLogo} alt="app-logo" />
        </div>
        <ul className={`navbar-links ${openSideBar ? "open" : ""}`}>
          <li className="navbar-link">
            <a href="#home">Hakkımızda</a>
          </li>
          <li className="navbar-link">
            <a href="#home">Jüri - Yarışma Yazılımı</a>
          </li>
          <li className="navbar-link">
            <a href="#home">Word Ninja</a>
          </li>
          <li className="navbar-link">
            <a href="#home">Word Pyramids</a>
          </li>
        </ul>

        <ul className="logo-links">
          <li className="logo-link">
            <a href="#home">
              <img src={logoYoutube} alt="logo-youtube" />
            </a>
          </li>
          <li className="logo-link">
            <a href="#home">
              <img src={logoInstagram} alt="logo-ins" />
            </a>
          </li>
          <li className="logo-link">
            <a href="#home">
              <img src={logoBehance} alt="logo-bhc" />
            </a>
          </li>
          <li className="logo-link">
            <a href="#home">
              <img src={logolinkedın} alt="logo-linkd" />
            </a>
          </li>
        </ul>
        <div className="hamburger" onClick={handleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
