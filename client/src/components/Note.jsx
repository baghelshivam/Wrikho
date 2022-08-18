import React from "react"

function Note(props) {
    
    function callSketch() {
        window.location.assign("/canvas/"+props.id);
    }

    return <div onClick={callSketch} className="note">
        <h1 className="title">{props.title}</h1>
        <img src={props.image} alt={props.content} />
        <p className="content">{props.content}</p>
    </div>
}


export default Note;
