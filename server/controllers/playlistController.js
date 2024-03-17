const Playlist = require('../models/Playlist');
const MusicTrack = require('../models/MusicTrack');

const createPlaylist = async (req, res, next) => {
    try {
        const { name, isPublic } = req.body;
        const newPlaylist = new Playlist({
            name,
            owner: req.user._id,
            isPublic
        });
        const savedPlaylist = await newPlaylist.save();
        res.status(201).json(savedPlaylist);
    } catch (error) {
        next(error);
    }
}

const addMusicToPlaylist = async (req, res, next) => {
    try {
        const { playlistId, musicIds } = req.body;
        // check if playlist exists
        const playlist = await Playlist.findById(playlistId)
        if(!playlist){
            return res.status(404).json({message: "Playlist not found"})
        }

        // Validate musicIds
        if (!musicIds || !Array.isArray(musicIds) || musicIds.length === 0) {
            return res.status(400).json({ message: 'Invalid musicIds' });
        }

        // Add each music track to MusicTrack model first
        const addedMusicTracks = [];
        for (const musicId of musicIds) {
            // Check if music track already exists
            let musicTrack = await MusicTrack.findById(musicId);
            if (!musicTrack) {
                // Create new music track if it doesn't exist
                // You may need to adjust this based on your requirements and the structure of music data from the search API
                const { title, artist, duration, genre } = req.body; // Assuming these fields are available in the request body
                musicTrack = new MusicTrack({ title, artist, duration, genre });
                musicTrack = await musicTrack.save();
            }
            addedMusicTracks.push(musicTrack);
        }

        // Add the added music tracks to the playlist
        playlist.tracks.push(...addedMusicTracks.map(track => track._id));
        await playlist.save();

        res.json(playlist);

        res.json(playlist);
    } catch (error) {
        next(error);
    }
}

const getAllGlobalPlaylist = async (req, res, next) => {
    try {
        const playLists = await Playlist.find({})
        res.json(playLists)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPlaylist,
    addMusicToPlaylist,
    getAllGlobalPlaylist
}