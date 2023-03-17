import React from "react";
import "./Loading.css";
function Loading() {
  return (
    <div className="popup-overlay">
      <div className="loading">
        <div className="loading-spinner" />
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
