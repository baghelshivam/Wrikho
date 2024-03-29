import React, {useState} from "react";
import Search from "./Search";

const Header = (prop) => {

    const [showSearch, setShowSearch] = useState(false);

    const searchBar = () => {
        setShowSearch(e => !e);
    }

    const openPopup =()=> {
        prop.togglePopup();        
    }

    return (
        <header className="header flexItems">
            <div className="flexItems">
                <a href="/" className="logo"><img style={{height:"2em"}} src="Images/wrikhoLogo.png" alt="Wrikho"></img></a>
            </div>
            <Search show={showSearch} />
            <div className="flexItems" style={{ display: showSearch ? "none" : "inherit" }}>
                {/* <button id="list">
                    <i className="bi bi-list"></i>
                </button> */}
                <button id="add" onClick={openPopup}>
                    <i className="bi bi-plus-lg"></i>
                </button>
                {/* <button onClick={searchBar}>
                    <i className="bi bi-search"></i>
                </button> */}
            </div>
        </header>);
}

export default Header;