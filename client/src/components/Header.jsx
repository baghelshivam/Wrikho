import React from "react";
// import { useAddNewNoteMutation } from "../features/notesApi";
function Header() {
    // const [addNewNote, { isLoading }] = useAddNewNoteMutation();
    // await addNewNote().unwrap();
    return (
        <header className="header flexItems">
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
                <button>
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </header>);
}

export default Header;