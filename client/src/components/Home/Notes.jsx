import React, { useState, useEffect } from "react";
import axios from "axios";

import Note from "./Note";
import Header from "./Header"; //importing components
import Footer from "./Footer";
import PopupTemplate from "./Sizepopup";
import Loading from "../Loading/Loading";

const Notes = () => {
  const [dataAxios, setDataAxios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log("changeing opening " + isOpen);
  };

  const deleteNode = async (noteId) => {
    try {
      await axios.delete(`https://api-kasg.onrender.com/deleteNote/${noteId}`);
      setDataAxios(dataAxios.filter((note) => note._id !== noteId));
    } catch (error) {
      //   console.log("cant delete errror");
      console.log(error);
    }
  };

  const addNote = async (noteData) => {
    try {
      const response = await axios.post(
        "https://api-kasg.onrender.com/addNote",
        noteData
      );
      const newNote = response.data;
      console.log(newNote);
      setDataAxios([...dataAxios, newNote]);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://api-kasg.onrender.com/notes")
      .then((response) => {
        setDataAxios(response.data);
        setIsLoading(false);
        // console.log(dataAxios);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsLoading(true);
      });
  }, []);

  return (
    <div>
      <Header togglePopup={togglePopup} />
      <PopupTemplate
        isOpen={isOpen}
        addNote={addNote}
        togglePopup={togglePopup}
      />
      {err ? (
        <p style={{ textAlign: "center", marginTop: "20em" }}>
          An error in fetching data.
        </p>
      ) : isLoading ? (
        <Loading className="popup-overlay" />
      ) : (
        <>
          <div className="notes">
            {dataAxios?.map((note) => (
              <Note
                key={note._id}
                id={note._id}
                title={note.title}
                image={note.data}
                content={note.content}
                onDelete={() => deleteNode(note._id)}
              />
            ))}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Notes;
