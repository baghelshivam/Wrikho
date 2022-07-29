import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//importing components
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Fabric from "./Fabric";

function App() {
    //making http request using useEffect

    const [data, setData] = React.useState(null);

    //React.useEffect(() => {
    //    fetch("/api")
    //.then((res) => console.log(res));
    //      // .then((data) => setData(data.message));
    //  }, []);

    return <div>
        <Header />
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/canvas" element={<Fabric />} />
                    <Route exact path="/" element={<Note  title="First" content="It is pleasure to meet you." image="https://cdn.pixabay.com/photo/2022/06/15/14/05/scotland-7264042_960_720.jpg" />} />
                </Routes>
            </BrowserRouter>
        </div>
        <p style={{ color: "red" }}>{!data ? "Loading.." : data}</p>
        <Footer />
    </div>
};

export default App;
