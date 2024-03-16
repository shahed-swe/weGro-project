const mongoose = require('mongoose');

const musicTrackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    artistName: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('MusicTrack', musicTrackSchema);
