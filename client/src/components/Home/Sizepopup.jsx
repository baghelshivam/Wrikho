import React, { useState, useEffect, useRef } from "react";
import "./Popup.css";

const PopupTemplate = (prop) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChange = (e) => setTitle(e.target.value);
  const contentChange = (e) => setContent(e.target.value);

  const inputRef = useRef(null);

  const saveData = (event) => {
    event.preventDefault();
    prop.addNote({ title: title, content: content });
    setTitle("");
    setContent("");
    prop.togglePopup();
  };

  useEffect(() => {
    if (prop.isOpen) {
      inputRef.current.focus();
    }
  }, [prop.isOpen]);
  return (
    <>
      {prop.isOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-content">
              <div className="popup-header">
                <h2>New Note</h2>
                <button onClick={() => prop.togglePopup()}>X</button>
              </div>
              <form onSubmit={saveData}>
                <label>
                  Title:
                  <input
                    ref={inputRef}
                    type="text"
                    value={title}
                    onChange={titleChange}
                  />
                </label>
                <br />
                <label>
                  Description:
                  <textarea value={content} onChange={contentChange} />
                </label>
                <br />
                <button style={{ width: "auto" }} type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupTemplate;
