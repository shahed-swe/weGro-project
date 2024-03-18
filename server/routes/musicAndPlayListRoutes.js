const express = require('express')
const router = express.Router();
const musicController = require("../controllers/musicController")
const playlistController = require("../controllers/playlistController")
const authenticate = require("../middleware/authentication")

router.post("/add-music", musicController.addBulkMusic)
router.get("/top-songs", musicController.topSongs)
/**
 * @swagger
 * tags:
 *   name: Music
 *   description: Music related APIs
 */

/**
 * @swagger
 * /api/music/search-music:
 *   get:
 *     summary: Search for music
 *     description: Search for music by title or artist name.
 *     tags: [Music]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Search query string
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of music tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MusicTrack'
 *       '400':
 *         description: Invalid request
 */
router.get("/search-music", musicController.searchMusic)


/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Playlist management APIs
 */

/**
 * @swagger
 * /api/music/add-playlist:
 *   post:
 *     summary: Create a new playlist
 *     description: Create a new playlist with the provided name and visibility.
 *     tags: [Playlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *             required:
 *               - name
 *               - isPublic
 *     responses:
 *       '201':
 *         description: Playlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 *       '500':
 *         description: Internal server error
 */
router.post("/add-playlist", authenticate, playlistController.createPlaylist)

/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Playlist management APIs
 */

/**
 * @swagger
 * /api/music/add-music-to-playlist:
 *   post:
 *     summary: Add music to a playlist
 *     description: Add a music track to a playlist by providing the playlist ID and the music ID.
 *     tags: [Playlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playlistId:
 *                 type: string
 *                 format: uuid
 *               musicId:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - playlistId
 *               - musicId
 *     responses:
 *       '200':
 *         description: Music added to playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       '400':
 *         description: Bad request - Music or Playlist not found
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 *       '404':
 *         description: Not found - Playlist not found
 *       '500':
 *         description: Internal server error
 */
router.put("/add-music-to-playlist", authenticate, playlistController.addMusicToPlaylist)


/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Playlist management APIs
 */

/**
 * @swagger
 * /api/music/all-playlists:
 *   get:
 *     summary: Get all global playlists
 *     description: Retrieve all global playlists that are marked as public.
 *     tags: [Playlist]
 *     responses:
 *       '200':
 *         description: A list of global playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 *       '500':
 *         description: Internal server error
 */
router.get("/all-playlists", playlistController.getAllGlobalPlaylist)


/**
 * @swagger
 * /api/music/delete-playlist/{id}:
 *   delete:
 *     summary: Delete a playlist
 *     description: Delete a playlist by its ID.
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Playlist ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Playlist deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedPlaylist:
 *                   $ref: '#/components/schemas/Playlist'
 *       '404':
 *         description: Not found - Playlist not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete-playlist/:id", playlistController.deletePlaylist);


/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Playlist management APIs
 */

/**
 * @swagger
 * /api/music/playlist-by-id/{id}:
 *   get:
 *     summary: Get playlist details
 *     description: Get details of a specific playlist by its ID.
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the playlist to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Playlist details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 playlist:
 *                   $ref: '#/components/schemas/Playlist'
 *       '404':
 *         description: Not found - Playlist not found
 *       '500':
 *         description: Internal server error
 */
router.get("/playlist-by-id/:id", playlistController.playListDetails);


/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Playlist management APIs
 */

/**
 * @swagger
 * /api/music/playlist-based-on-user-id/{id}:
 *   get:
 *     summary: Get playlists based on user ID
 *     description: Retrieve playlists belonging to a specific user based on their ID.
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose playlists to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Playlists retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 *       '500':
 *         description: Internal server error
 */
router.get("/playlist-based-on-user-id/:id", playlistController.getAllPlayListsBasedOnUserId);

module.exports = router