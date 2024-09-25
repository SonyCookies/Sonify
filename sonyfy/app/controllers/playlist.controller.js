const Song = require("../models/song.model");
const Playlist = require("../models/playlist.model");

module.exports = {
  home: (req, res) => {
    res.render("playlist");
  },

  showPlaylists: (req, res) => {
    Playlist.getAllPlaylists((err, playlists) => {
      if (err) {
        console.error("Error fetching playlists:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.render("playlists", { playlists });
    });
  },

  create: (req, res) => {
    const { playlistName } = req.body;
    console.log("Received playlistName:", playlistName);

    if (!playlistName) {
      return res.status(400).json({ message: "Playlist title is required" });
    }

    Playlist.createPlaylist(playlistName, (err, result) => {
      if (err) {
        console.error("Error creating playlist:", err);
        return res.status(500).json({ message: "Failed to create playlist" });
      }
      res.status(201).json({
        message: "Playlist created successfully",
        playlistId: result.insertId,
      });
    });
  },

  view: (req, res) => {
    const playlistId = req.params.id;

    Playlist.getPlaylistById(playlistId, (err, playlist) => {
      if (err) {
        console.error("Error fetching playlist:", err);
        return res.status(500).send("Error fetching playlist");
      }

      if (!playlist) {
        return res.status(404).send("Playlist not found");
      }

      res.render("playlist_view", { playlist });

      // Song.getSongsByPlaylistId(playlistId, (err, songs) => {
      //   if (err) {
      //     console.error("Error fetching songs:", err);
      //     return res.status(500).send("Error fetching songs");
      //   }

      //   res.render('playlist_view', {
      //     playlist,
      //     songs
      //   });
      // });
    });
  },
};