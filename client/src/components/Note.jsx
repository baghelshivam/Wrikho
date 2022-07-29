import React from "react"

function Note(props) {

    function callSketch() {
        location.assign("/canvas");
    }

    return <div onClick={callSketch} className="note">
        <h1 className="title">{props.title}</h1>
        <img src={props.image} />
        <p className="content">{props.content}</p>
    </div>
}


export default Note;
