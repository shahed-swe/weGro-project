const express = require('express')
const router = express.Router();
const musicController = require("../controllers/musicController")
const playlistController = require("../controllers/playlistController")
const authenticate = require("../middleware/authentication")

router.post("/add-music", musicController.addBulkMusic)
router.get("/top-songs", musicController.topSongs)
router.get("/search-music", musicController.searchMusic)
router.post("/add-playlist", authenticate, playlistController.createPlaylist)
router.put("/add-music-to-playlist", authenticate, playlistController.addMusicToPlaylist)

module.exports = router