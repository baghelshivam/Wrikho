import React from "react"
function Header() {
    return (
        <header className="header headerFabric flexItems">
            <div className="flexItems">
                <a href="/" className="logo">Wrikho</a>
            </div>
            <div className="flexItems">
                <button>
                    <i className="bi-list"></i>
                </button>
                <button>
                    <i className="bi-plus-lg"></i>
                </button>
                <button id="drawing">
                <i className="bi bi-pencil"></i>
                </button>
                <button id="zoomIn">
                    <i className="bi bi-zoom-in"></i>
                </button>
                <button id="zoomOut">
                    <i className="bi bi-zoom-out"></i>
                </button>
            </div>
        </header>);
}

export default Header;