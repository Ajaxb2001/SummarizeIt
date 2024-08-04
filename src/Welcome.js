// src/WelcomePage.js
import React from "react";
import "./Welcome.css";

function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1>Welcome to Text Summarizer</h1>
        <p>
          Effortlessly summarize your text and make the most out of your
          content.
        </p>
        <a href="/app" className="get-started-button">
          Get Started
        </a>
      </div>
    </div>
  );
}

export default WelcomePage;
