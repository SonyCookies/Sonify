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
    const query = "SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d') as fcreated_at FROM playlists WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0]);
    });
  }
};
