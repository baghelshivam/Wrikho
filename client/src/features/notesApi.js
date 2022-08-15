import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    tagTypes:   ['Note'],
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
            query: intialNote => ({
                url: "/notes",
                method: 'POST',
                body: intialNote,
            }),
            invalidatesTages: ['Note']
        })
    }),
});

export const { useGetAllNotesQuery , useAddNewNoteMutation } = notesApi;