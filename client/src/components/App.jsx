import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./Header";      //importing components
import Footer from "./Footer";
import Notes from "./Notes";
import Fabric from "./Fabric";
import NotFound from "./NotFound";

function App() {
    //making http request using useEffect

    //const [data, setData] = React.useState(null);

    //React.useEffect(() => {
    //    fetch("/api")
    //.then((res) => console.log(res));
    //      // .then((data) => setData(data.message));
    //  }, []);
    return <div>
        <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/canvas" element={<Fabric />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route exact path="/" element={<Notes />} />
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
            </BrowserRouter>
        <Footer />
    </div>
    //        <p style={{ color: "red" }}>{!data ? "Loading.." : data}</p>
};

export default App;
