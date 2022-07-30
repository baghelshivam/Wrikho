import React from "react";

import { useGetAllNotesQuery } from "../features/notesApi";

import Note from "./Note";


const Notes = () => {
    const { data, error, isLoading } = useGetAllNotesQuery();     //invoking data from notes
    return (
        <div>
            {isLoading ? (<p>Loding---</p>) :
                error ? (<p>An error in fecting data.</p>) :
                    (<>
                        <div className="pro">
                            {data?.map(note => <Note key={note.id} title={note.title} image={note.image} content={note.content} />)}
                        </div>
                    </>)}
        </div>
    );
}

export default Notes;
