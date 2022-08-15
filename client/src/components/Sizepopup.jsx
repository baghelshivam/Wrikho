import React, { useState } from "react";
import { useEffect } from "react";

import { useAddNewNoteMutation } from "../features/notesApi";

const PopupTemplate = (prop) => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("name");
    const [link, setLink] = useState("link");
    const [content, setContent] = useState("content");

    const [addNewNote, { iSLoading }] = useAddNewNoteMutation();

    const nameChange = e => setName(e.target.value);
    const linkChange = e => setLink(e.target.value);
    const contentChange = e => setContent(e.target.value);

    const canSave = [name, link, content].every(Boolean) && !iSLoading;

    const saveData = async () => {
        console.log("plus clicked");
        if (canSave) {
            try {
                console.log("it is sending");
                await addNewNote({ name, link, content }).unwrap();
                setName("");
                setLink("");
                setContent("");
            } catch (err) {
                console.error("failed to save post ", err);
            }
        }
    }


    useEffect(() => {                                           //after page is rendered when onclick event occur save data and post it
        setShow(prop.show);
        document.getElementById("submit").onclick = function (event) {
            saveData();
        };
    }, [prop.show, name, link, content]); // including name link content so it can be used by savedata


    return (
        <div style={{
            visibility: show ? "visible" : "hidden",
            opacity: show ? "1" : "0"
        }}>
            <div style={{ paddingTop: "10em", color: "black", top: "0", left: "0", right: "0", bottom: "0", textAlign: "center", position: "fixed", zIndex: "4", background: "#48d889" }}>
                <h4>New WrikhoPad</h4>
                <form>
                    <label htmlFor="fname">Name:</label><br></br>
                    <input type={"text"} onChange={nameChange}></input><br></br>
                    <label htmlFor="lname">Link:</label><br></br>
                    <input type={"text"} onChange={linkChange}></input><br></br>
                    <label htmlFor="cname">Content:</label><br></br>
                    <input type={"text"} onChange={contentChange}></input><br></br>
                    <button id="submit">Submit</button>
                </form>
            </div>

        </div>
    );
}

export default PopupTemplate;