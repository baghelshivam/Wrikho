import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api-kasg.onrender.com" }),     //for accesing on the phone 
    tagTypes: ["Note"],
    endpoints: (builder) => ({

        getAllNotes: builder.query({
            query: () => "/notes",
            providesTags: ["Note"]
        }),

        addNewNote: builder.mutation({
            query: (newNote) => ({
                url: "/addNote",
                method: 'POST',
                body: newNote,
                transformResponse: (response) => { return response; }
            }),
            // responseHandler: (response) => response.text(),
            invalidatesTages: ["Note"],

        }),

        deleteNote: builder.mutation({
            query: (id) => ({
                url: "/deleteNote",
                method: "DELETE",
                body: id,
                responseHandler: (response) => response.text(),
            }),
            invalidatesTages: ["Note"]
        }),

        getImageData: builder.query({
            query: (id) => ({
                url: `/imageData/${id}`
            }),
            providesTags: ["Note"]
        })
    }),
});

export const { useGetAllNotesQuery, useAddNewNoteMutation, useDeleteNoteMutation, useGetImageDataQuery } = notesApi;