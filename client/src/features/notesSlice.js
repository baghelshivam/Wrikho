// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";

// const initialState = {
//     note: [],
//     status: null,
// }

// export const notesFetch = createAsyncThunk(
//     "notes/notesFetch",
//     // async () => {       //id = null, { rejectWithValue } for individual data
//     //         const res = await axios.get("http://localhost:3001/notes"); //res from link
//     //         return res?.data;    //if there is not data it will throw error thats why included ?    
//     // }
// )

// const notesSlice = createSlice({
//     name: "notes",
//     initialState,
//     reducers: {},
//     // extraReducers: {
//     //     [notesFetch.pending]: (state, action) => {//accecing old state
//     //         state.status = "pending";
//     //     },
//     //     [notesFetch.fulfilled]: (state, action) => {//accecing old state
//     //         state.status = "success";
//     //         state.note = action.payload;
//     //     },
//     //     [notesFetch.rejected]: (state, action) => {//accecing old state
//     //         state.status = "rejected";
//     //     }
//     // }
// })

// export default notesSlice.reducer;