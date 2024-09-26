const multer = require("multer");
const path = require("path");
const Song = require("../models/song.model");
const Playlist = require("../models/playlist.model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const songDir = "./public/songs";
    const imageDir = "./public/covers";

    const dir = file.fieldname === "songFile" ? songDir : imageDir;
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = {
  listSongs: (req, res) => {
    Song.getAllSongs((error, songs) => {
      if (error) {
        console.error("Error fetching songs:", error);
        return res.status(500).json({ message: "Failed to fetch songs" });
      }

      res.render("songs", { 
        songs 
      });
    });
  },
  addSong: [
    upload.fields([{ name: "songFile" }, { name: "imageFile" }]),
    (req, res) => {
      const { title, artist, album, genre, releaseDate } = req.body;
      const songFilePath = `/songs/${req.files["songFile"][0].filename}`;
      const imageFilePath = `/covers/${req.files["imageFile"][0].filename}`;

      const newSongData = {
        title,
        artist,
        album,
        genre,
        releaseDate,
        songFilePath,
        imageFilePath,
      };

      Song.createSong(newSongData, (err, result) => {
        if (err) {
          console.error("Error saving song:", err);
          return res.status(500).json({ message: "Failed to add song" });
        }
        res.status(201).json({ message: "Song added successfully", result });
        console.log("Song saved successfully:");
      });
    },
  ],
  updateSong: (req, res) => {
    const { id, title, artist, album, genre, releaseDate } = req.body;

    Song.updateSong(
      { id, title, artist, album, genre, releaseDate },
      (err, result) => {
        if (err) {
          console.error("Error updating song:", err);
          return res.status(500).json({ message: "Failed to update song" });
        }
        res.status(200).json({ message: "Song updated successfully" });
      }
    );
  },
  deleteSong: (req, res) => {
    const { id } = req.params;

    Song.deleteSong(id, (err, result) => {
      if (err) {
        console.error("Error deleting song:", err);
        return res.status(500).json({ message: "Failed to delete song" });
      }
      res
        .status(200)
        .json({ message: "Song and associated files deleted successfully" });
    });
  },
  playSong: (req, res) => {
    const songId = req.params.id;
    Song.getSongById(songId, (err, song) => {
      if (err || !song) {
        return res.status(404).send("Song not found");
      }
      res.render("playSong", { song });
    });
  },
};


