import React from "react";

function Copyright() {
  let date = new Date().getFullYear();

  return (
    <div className="footer">
      <p>@ Copyright {date}</p>
      <a
        style={{ color: "inherit" }}
        href="https://github.com/baghelshivam/Wrikho"
      >
        <i className="bi bi-github"></i>
      </a>
    </div>
  );
}
export default Copyright;
