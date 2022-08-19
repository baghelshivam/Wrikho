import React from "react";

function Header() {

    return (
        <header className="header flexItems">
            <div className="flexItems">
                <a href="/" className="logo">Wrikho</a>
            </div>
            <div className="flexItems">
                <button id="list">
                    <i className="bi-list"></i>
                </button>
                <button id="add">
                    <i className="bi-plus-lg"></i>
                </button>
                <button>
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </header>);
}

export default Header;