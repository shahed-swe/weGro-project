const MusicTrack = require("../models/MusicTrack")
const axios = require("axios")

const searchMusic = async (req, res, next) => {
    try {
        const queryString = req.query.q;

        const musicResults = await MusicTrack.find({
            $or: [
                { title: { $regex: queryString, $options: 'i' } }, 
                { artistName: { $regex: queryString, $options: 'i' } }
            ]
        });
        res.json(musicResults);
    } catch (error) {
        next(error);
    }
};


const topSongs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const musicResults = await MusicTrack.aggregate([
            { $sample: { size: pageSize } }
        ]);

        res.json(musicResults);
    } catch (error) {
        next(error);
    }
};

const addBulkMusic = async (req, res, next) => {
    try {
        const tracks = req.body;

        const addedTracks = [];
        for (const track of tracks) {
            const newTrack = new MusicTrack({
                title: track.title,
                artistName: track.artist.name,
                duration: track.duration,
                thumbnail: track.artist.picture_medium,
                link: track.preview
            });
            const savedTrack = await newTrack.save();
            addedTracks.push(savedTrack);
        }

        res.json({ message: 'Bulk music added successfully', addedTracks });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    searchMusic,
    addBulkMusic,
    topSongs
}