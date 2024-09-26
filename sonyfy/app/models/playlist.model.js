const db = require("../configs/db.conf");

module.exports = {
  createPlaylist: (name, callback) => {
    const query = "INSERT INTO playlists (name) VALUES (?)";
    db.query(query, [name], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },
  getAllPlaylists: (callback) => {
    const query = "SELECT * FROM playlists";
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },
  getPlaylistById: (id, callback) => {
    const query = `
      SELECT 
        id, 
        name, 
        DATE_FORMAT(createdAt, '%Y-%m-%d') AS fcreatedAt 
      FROM playlists 
      WHERE id = ?
    `;
    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, null);
      }
    });
  },
  getSongsInPlaylist: (playlistId, callback) => {
    const query = `
      SELECT songs.* 
      FROM songs 
      INNER JOIN playlist_song ON songs.id = playlist_song.song_id 
      WHERE playlist_song.playlist_id = ?`;

    db.query(query, [playlistId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },
  getAllPlaylistsWithSongCount: (callback) => {
    const query = `
      SELECT 
        p.id, p.name, p.createdAt, 
        COUNT(ps.song_id) AS songCount
      FROM 
        playlists p
      LEFT JOIN 
        playlist_song ps ON p.id = ps.playlist_id
      GROUP BY 
        p.id
    `;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  deleteSongsByPlaylistId: (playlistId, callback) => {
    const query = `DELETE FROM playlist_song WHERE playlist_id = ?`;

    db.query(query, [playlistId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  deletePlaylistById: (playlistId, callback) => {
    const query = `DELETE FROM playlists WHERE id = ?`;

    db.query(query, [playlistId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
};
