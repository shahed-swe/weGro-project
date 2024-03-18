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
        getAllPlayLists: builder.query({ query: () => "/music/all-playlists"}),
        addPlaylist: builder.mutation({
            query: (playlist) => ({
                url: '/music/add-playlist',
                method: 'POST',
                body: playlist
            })
        }),
        deletePlaylist: builder.mutation({
            query: (playlistId) => ({
                url: `/music/delete-playlist/${playlistId}`,
                method: 'DELETE'
            })
        }),
        addMusicToPlayList:  builder.mutation({
            query: (payload) => ({
                url: '/music/add-music-to-playlist',
                method: 'PUT',
                body: payload
            })
        }),
        getPlayListById: builder.query({
            query: ({playlistId}) => {
                return `/music/playlist-by-id/${playlistId}`
            }
        }),
        getPlayListBasedOnUserId: builder.query({
            query: ({userId}) => {
                return `/music/playlist-based-on-user-id/${userId}`
            }
        })
    }),
});

export const {
    useGetTopSongsQuery,
    useGetSongsBySearchQuery,
    useGetAllPlayListsQuery,
    useAddPlaylistMutation,
    useDeletePlaylistMutation,
    useAddMusicToPlayListMutation,
    useGetPlayListByIdQuery,
    useGetPlayListBasedOnUserIdQuery
} = MusicService;