import React, { useEffect, useState } from "react";

const Note = ({ id, title, image, content, onDelete }) => {
  function callSketch() {
    window.location.assign("/canvas/" + id);
  }

  return (
    <div className="note">
      <h1
        className="title"
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </h1>

      {<img src={image} onClick={callSketch} alt={content} />}

      <div className="content">
        <button onClick={onDelete} className="delete">
          <i className="bi bi-three-dots-vertical"></i>
        </button>

        <p>{content}</p>
      </div>
    </div>
  );
};

export default Note;
