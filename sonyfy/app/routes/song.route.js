const express = require('express');
const router = express.Router();
const song = require("../controllers/song.controller");

router.get('/', song.listSongs);
router.post('/add', song.addSong);
router.put('/edit/:id', song.updateSong);
router.delete('/delete/:id', song.deleteSong);
router.get('/play/:id', song.playSong);

module.exports = router;