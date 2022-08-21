import React, { useState } from "react"
import { useDeleteNoteMutation, useGetImageDataQuery } from '../../features/notesApi';

const Note = (props) => {

    const [deleteNOTE, { isLoading }] = useDeleteNoteMutation({}, { refetchOnMountOrArgChange: true });
    const [id, setId] = useState(props.id);
    const canDelete = [props.id].every(Boolean) && !isLoading;
    const { data, error, iSLoading } = useGetImageDataQuery(id);




    const delNote = async () => {
        if (canDelete) {
            try {
                await deleteNOTE({ id }).unwrap();
                setId("");
            } catch (err) {
                console.error("Failed to Delete Note.", err);
            }
        }
    }

    function callSketch() {
        window.location.assign("/canvas/" + props.id);
    }

    function deleteNote() {
        delNote();
        console.log("delete pressed : ", props.id);
        window.location.reload();
    }

    return (<div className="note" >

        <h1 className="title">{props.title}</h1>

        {
            error ? <p>error occured in loading data</p> :
                iSLoading ? <h1>Loading.....</h1> :
                    <img src={data} onClick={callSketch} alt={props.content} />
        }

        <p className="content">{props.content}</p>

        <button onClick={deleteNote} className="delete">
            <i className="bi bi-three-dots-vertical"></i>
        </button>

    </div>);
}


export default Note;
