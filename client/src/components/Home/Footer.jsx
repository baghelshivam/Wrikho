import React from "react";

function Copyright() {
    let dinank = new Date().getFullYear();
    return (<div className="footer">
        <p>@ Copyright {dinank}</p>
        <a  style={{color: "inherit"}} href="https://github.com/baghelshivam/Wrikho"><i className="bi bi-github"></i></a>
    </div>)
}
export default Copyright;