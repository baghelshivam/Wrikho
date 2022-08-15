import React from "react";

import { useGetAllNotesQuery } from "../features/notesApi";

import Note from "./Note";
// import PopupSize from "./Sizepopup";
import Header from "./Header";      //importing components
import Footer from "./Footer";

const Notes = () => {
    const { data, error, isLoading } = useGetAllNotesQuery();     //invoking data from notes
    return (
        <div>
            <Header />
            {/* <PopupSize /> */}
            {
                error ? (<p>An error in fetching data.</p>) :
                    isLoading ? (<p style={{textAlign : "center" , margin : "20em"}}>Loding---</p>) :
                        (<>
                            <div className="notes">
                                {data?.map(note => <Note key={note.id} title={note.title} image={note.link} content={note.content} />)}
                            </div>
                        </>)}
            <Footer />
        </div>
    );
}

export default Notes;
