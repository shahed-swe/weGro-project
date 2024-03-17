import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MusicService = createApi({
    reducerPath: 'MusicService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${window.localStorage.getItem("token") }`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopSongs: builder.query({
            query: ({ page, perPage }) => {
                return `/music/top-songs?page=${page}&pageSize=${perPage}`
            }
        }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/music/search-music?q=${searchTerm}` }),
        getAllPlayLists: builder.query({ query: () => "/api/music/all-playlists"}),
        addPlaylist: builder.mutation({
            query: (playlist) => ({
                url: '/music/add-playlist',
                method: 'POST',
                body: playlist
            })
        }),
    }),
});

export const {
    useGetTopSongsQuery,
    useGetSongsBySearchQuery,
    useGetAllPlayListsQuery,
    useAddPlaylistMutation
} = MusicService;