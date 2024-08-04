import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import SummaryCard from "./SummaryCard";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState(20); // Default length in percentage

  const handleSummarize = async () => {
    const response = await fetch("http://localhost:5000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, length: summaryLength }),
    });
    const data = await response.json();
    setSummary(data.summary);
  };

  return (
    <div className="App">
      <Header />
      <div className="name">Welcome to SummarizeIt</div>
      <main>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
        />
        <div className="controls">
          <label htmlFor="summaryLength">Summary Length (%):</label>
          <input
            type="range"
            id="summaryLength"
            min="10"
            max="100"
            value={summaryLength}
            onChange={(e) => setSummaryLength(e.target.value)}
          />
          <span>{summaryLength}%</span>
          <button onClick={handleSummarize}>Summarize</button>
          {summary && <SummaryCard summary={summary} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
