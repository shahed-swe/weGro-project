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
        const { playlistId, musicId } = req.body;
        const playlist = await Playlist.findById(playlistId)
        if(!playlist){
            return res.status(404).json({message: "Playlist not found"})
        }

        const music = await MusicTrack.findById(musicId)
        if (!music) {
            return res.status(400).json({ message: 'Music Not Found' });
        }

        playlist.tracks.push(musicId);
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


const deletePlaylist = async (req, res, next) => {
    try {
        const playlistId = req.params.id;

        const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

        if (!deletedPlaylist) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        res.json({ message: "Playlist deleted successfully", deletedPlaylist });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPlaylist,
    addMusicToPlaylist,
    getAllGlobalPlaylist,
    deletePlaylist
}