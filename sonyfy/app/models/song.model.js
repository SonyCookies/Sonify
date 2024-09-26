const db = require("../configs/db.conf");
const fs = require("fs");
const path = require("path");

module.exports = {
  createSong: (songData, callback) => {
    const {
      title,
      artist,
      album,
      genre,
      releaseDate,
      songFilePath,
      imageFilePath,
    } = songData;

    const query = `INSERT INTO songs (title, artist, album, genre, releaseDate, songFilePath, imageFilePath, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

    db.query(
      query,
      [title, artist, album, genre, releaseDate, songFilePath, imageFilePath],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results);
      }
    );
  },

  getAllSongs: (callback) => {
    const query = `SELECT *, DATE_FORMAT(releaseDate, '%Y-%m-%d') as formattedReleaseDate FROM songs ORDER BY createdAt DESC`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }

      const formattedResults = results.map((song) => ({
        ...song,
        releaseDate: song.formattedReleaseDate,
      }));

      callback(null, formattedResults);
    });
  },

  updateSong: (songData, callback) => {
    const { id, title, artist, album, genre, releaseDate } = songData;
    const query = `UPDATE songs SET title = ?, artist = ?, album = ?, genre = ?, releaseDate = ? WHERE id = ?`;

    db.query(
      query,
      [title, artist, album, genre, releaseDate, id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      }
    );
  },

  deleteSong: (id, callback) => {
    const getFilesQuery = `SELECT songFilePath, imageFilePath FROM songs WHERE id = ?`;

    db.query(getFilesQuery, [id], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(new Error("Song not found"));
      }

      const { songFilePath, imageFilePath } = results[0];

      const fullSongPath = path.join(__dirname, "../../public", songFilePath);
      const fullImagePath = path.join(__dirname, "../../public", imageFilePath);

      fs.unlink(fullSongPath, (err) => {
        if (err) {
          console.error("Error deleting song file:", err);
        }
      });

      fs.unlink(fullImagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });

      const deleteQuery = `DELETE FROM songs WHERE id = ?`;

      db.query(deleteQuery, [id], (err, results) => {
        if (err) {
          return callback(err);
        }

        callback(null, results);
      });
    });
  },

  getSongById: (id, callback) => {
    const query = "SELECT * FROM songs WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length > 0) {
        return callback(null, results[0]);
      }
      callback(null, null);
    });
  },

  getToPlaySongs: async () => {
    const [row] = await db.execute("SELECT * FROM songs");
    return row;
  },

  getSongsByPlaylistId: (playlistId, callback) => {
    const query = `
      SELECT songs.* FROM songs 
      INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id 
      WHERE playlist_songs.playlist_id = ?`;

    db.query(query, [playlistId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results.length ? results : []);
    });
  },
};
