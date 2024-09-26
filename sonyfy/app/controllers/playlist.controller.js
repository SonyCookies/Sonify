const Song = require("../models/song.model");
const Playlist = require("../models/playlist.model");
const PlaylistSong = require("../models/playlist_songs.model");

module.exports = {
  home: (req, res) => {
    res.render("playlist");
  },
  showPlaylists: (req, res) => {
    Playlist.getAllPlaylistsWithSongCount((err, playlists) => {
      if (err) {
        console.error("Error fetching playlists:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Check if it's an AJAX request
      if (req.xhr) {
        // Render only the playlists part and send back as partial HTML
        return res.render("partials/playlist_list", { playlists });
      }

      // Normal full page render
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

      Song.getSongsByPlaylistId(playlistId, (err, songs) => {
        if (err) {
          console.error("Error fetching songs:", err);
          return res.status(500).send("Error fetching songs");
        }

        res.render("playlist_view", {
          playlist,
          songs,
        });
      });
    });
  },
  getPlaylistWithSongs: (req, res) => {
    const playlistId = req.params.id;

    PlaylistSong.getSongsByPlaylistId(playlistId, (err, results) => {
      if (err) {
        console.error("Error fetching playlist songs:", err);
        return res.status(500).send("Error retrieving playlist data");
      }

      if (results.length > 0) {
        const playlistInfo = {
          id: results[0].playlist_id,
          name: results[0].playlist_name,
          created_at: results[0].playlist_created_at,
        };
        const songs = results.map((song) => ({
          id: song.song_id,
          title: song.title,
          artist: song.artist,
          album: song.album,
          genre: song.genre,
          releaseDate: song.releaseDate,
          songFilePath: song.songFilePath,
          imageFilePath: song.imageFilePath,
        }));

        res.render("playlist_view", {
          playlist: playlistInfo,
          songs: songs,
        });
      } else {
        res.render("playlist_view", {
          playlist: null,
          songs: [],
        });
      }
    });
  },
  deletePlaylist: (req, res) => {
    const playlistId = req.params.id;

    Playlist.deleteSongsByPlaylistId(playlistId, (err) => {
      if (err) {
        console.error("Error deleting songs from playlist_songs:", err);
        return res.status(500).send("Failed to delete playlist songs");
      }
      Playlist.deletePlaylistById(playlistId, (err) => {
        if (err) {
          console.error("Error deleting playlist:", err);
          return res.status(500).send("Failed to delete playlist");
        }
        res.json({ message: "Playlist deleted successfully" });
      });
    });
  },
};
