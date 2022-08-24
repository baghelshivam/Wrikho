import React from "react"
import { useState } from "react";
function Header() {
    const [toggle, setToggle] = useState(false);
    return (
        <header className="header headerFabric flexItems">
            <div className="flexItems">
                <a href="/" className="logo"><img style={{ height: "2em" }} src="../Images/wrikhoLogo.png"></img></a>
            </div>
            <div className="flexItems">
                <button title="New Page">
                    <i className="bi bi-plus-lg"></i>
                </button>
                <button title="Background">
                    <i className="bi bi-image-alt"></i>
                </button>
                <button id="clear" title="Clear">
                    <i className="bi bi-trash"></i>
                </button>
                <button id="drawing" title="Pen/Select" onClick={() => setToggle(e => !e)}>
                    <i className="bi bi-pencil" style={{ color : toggle ? "black" : "white"}}></i>
                </button>
                <button id="zoomIn" title="ZoomIn">
                    <i className="bi bi-zoom-in"></i>
                </button>
                <button id="zoomOut" title="ZoomOut">
                    <i className="bi bi-zoom-out"></i>
                </button>
            </div>
        </header>);
}

export default Header;