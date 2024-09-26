const express = require("express");
const router = express.Router();
const playlist = require("../controllers/playlist.controller");

router.get("/", playlist.showPlaylists);
router.post("/create", playlist.create);
router.get("/view/:id", playlist.getPlaylistWithSongs);
// router.get('/edit/:id', playlist.editPlaylistView);
router.delete('/delete/:id', playlist.deletePlaylist);


module.exports = router;
