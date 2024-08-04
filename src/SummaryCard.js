import React from "react";
import "./SummaryCard.css";

function SummaryCard({ summary }) {
  return (
    <div className="summary-card">
      <h2>Summary</h2>
      <p>{summary}</p>
    </div>
  );
}

export default SummaryCard;
