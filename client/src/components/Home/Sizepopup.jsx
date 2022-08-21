import React, { useState, useEffect } from "react";

import { useAddNewNoteMutation } from "../../features/notesApi";

const PopupTemplate = (prop) => {

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("name");
    const [content, setContent] = useState("content");

    const [addNewNote, { iSLoading }] = useAddNewNoteMutation();

    const titleChange = e => setTitle(e.target.value);
    const contentChange = e => setContent(e.target.value);

    const canSave = [title, content].every(Boolean) && !iSLoading;

    const saveData = async () => {
        if (canSave) {
            try {
                const response = await addNewNote({ title, content }).unwrap();
                setTitle("");
                setContent("");
            } catch (err) {
                console.error("failed to save post ", err);
            }
        }
        setShow(!prop.show);
    }


    useEffect(() => {                                           //after page is rendered when onclick event occur save data and post it
        setShow(prop.show);
        document.getElementById("cancel").onclick = () => {
            setShow(false);
        };
    }, [prop.show, title, content]); // including name link content so it can be used by savedata


    return (
        <div style={{
            visibility: show ? "visible" : "hidden",
            opacity: show ? "1" : "0"
        }}>
            <div style={{ paddingTop: "10em", color: "black", top: "0", left: "0", right: "0", bottom: "0", textAlign: "center", position: "fixed", zIndex: "4", background: "#48d889" }}>
                <h4>New WrikhoPad</h4>
                <form onSubmit={saveData}>
                    <label htmlFor="fname">Name:</label><br></br>
                    <input type={"text"} onChange={titleChange} required></input><br></br>
                    <label htmlFor="lname">Content:</label><br></br>
                    <input type={"text"} onChange={contentChange} required></input><br></br>
                    <input type={"submit"} value="Submit" />
                    {/* <button type={"submit"} value="Submit">Submit</button> */}
                    <button id="cancel">Cancel</button>
                    {/* <input id="cancel" type={"cancel"} value="Cancel"/> */}
                </form>
            </div>

        </div>
    );
}

export default PopupTemplate;