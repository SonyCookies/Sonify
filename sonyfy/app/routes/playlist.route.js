const express = require('express');
const router = express.Router();
const playlist = require("../controllers/playlist.controller");

router.get('/', playlist.showPlaylists);
router.post('/create', playlist.create);
router.get('/:id', playlist.view)


module.exports = router;