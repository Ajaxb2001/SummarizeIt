import React from "react";
import "./Header.css";
import logo from "../src/logo.png"; // Make sure to place your logo in the src directory

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>
        Text Summarizer
        <span>Summarize your text effortlessly</span>
      </h1>
    </header>
  );
}

export default Header;
