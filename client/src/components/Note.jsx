import React from "react"
// import { useGetNotesDataMutation } from '../features/notesApi';

function Note(props) {
    // const [getNotesData, { isLoading }] = useGetNotesDataMutation();
    // const id = props.id;
    // const canSave = [id].every(Boolean) && !isLoading;
    // const getData = async () => {
    //     if (canSave) {
    //         try {
    //             await getNotesData({ id }).unwrap();
    //             id = 0;
    //         } catch (err) {
    //             console.error("failed to send id for getiing data ", err);
    //         }
    //     }
    // }
    function callSketch() {
        // getData();
        window.location.assign("/canvas/" + props.id);
    }

    return <div onClick={callSketch} className="note">
        <h1 className="title">{props.title}</h1>
        <img src={props.image} alt={props.content} />
        <p className="content">{props.content}</p>
    </div>
}


export default Note;
