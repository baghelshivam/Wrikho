import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./Header";      //importing components
import Footer from "./Footer";
import Notes from "./Notes";
import Fabric from "./Fabric";
import NotFound from "./NotFound";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/canvas" element={<Fabric />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route exact path="/" element={<Notes />} />
                <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
        </BrowserRouter>);
    //        <p style={{ color: "red" }}>{!data ? "Loading.." : data}</p>
};

export default App;
