import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    endpoints: (builder) => ({
        getAllNotes: builder.query({
            query: () => "notes",
        }),
    }),
});

export const { useGetAllNotesQuery } = notesApi;