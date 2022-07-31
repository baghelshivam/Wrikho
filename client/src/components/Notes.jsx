import React from "react";

import { useGetAllNotesQuery } from "../features/notesApi";

import Note from "./Note";
import PopupSize from "./Sizepopup";

const Notes = () => {
    const { data, error, isLoading } = useGetAllNotesQuery();     //invoking data from notes
    return (
        <div>
            {/* <PopupSize /> */}
            {isLoading ? (<p>Loding---</p>) :
                error ? (<p>An error in fecting data.</p>) :
                    (<>
                        <div className="notes">
                            {data?.map(note => <Note key={note.id} title={note.title} image={note.image} content={note.content} />)}
                        </div>
                    </>)}
        </div>
    );
}

export default Notes;
