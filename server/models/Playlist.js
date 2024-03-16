const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MusicTrack'
    }]
});

module.exports = mongoose.model('Playlist', playlistSchema);
