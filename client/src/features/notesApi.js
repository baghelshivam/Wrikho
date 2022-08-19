import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.120.230:3001" }),     //for accesing on the phone 
    tagTypes: ['Note'],
    endpoints: (builder) => ({
        getAllNotes: builder.query({
            query: () => ({
                url: "/notes",
                method: "GET",
            }),
            // query: () => "/notes",
            providesTags: ['Note']
        }),
        addNewNote: builder.mutation({
            query: initialNote => ({
                url: "/addNote",
                method: 'POST',
                body: initialNote,
            }),
            transformResponse: (response) => {
                return response;
            },
            // invalidatesTages: ['Note']
        }),
    }),
});

export const { useGetAllNotesQuery, useAddNewNoteMutation, useGetNotesDataMutation } = notesApi;