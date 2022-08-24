import React from "react";
import ReactDOM from "react-dom/client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import "./index.css";
import App from "./components/App.jsx";

// import { notesFetch } from "./features/notesSlice";     // can include notesReducer
import { notesApi } from "./features/notesApi";

const store = configureStore({                    //configuring store
  reducer: {
    // notes: notesReducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware),
});


const rootHome = ReactDOM.createRoot(document.getElementById("rootHome"));    //for home page

rootHome.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);