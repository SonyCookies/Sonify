const db = require("../configs/db.conf");

module.exports = {
  deleteBySongId: (songId, callback) => {
    const query = "DELETE FROM playlist_song WHERE song_id = ?";
    db.query(query, [songId], callback);
  },
  getSongsByPlaylistId: (playlistId, callback) => {
    const query = `
      SELECT 
        ps.playlist_id, 
        ps.song_id, 
        ps.addedAt, 
        s.title, 
        s.artist, 
        s.album, 
        s.genre, 
        s.releaseDate, 
        s.songFilePath, 
        s.imageFilePath, 
        p.name AS playlist_name, 
        p.createdAt AS playlist_created_at
      FROM 
        playlist_song ps
      JOIN 
        songs s ON ps.song_id = s.id
      JOIN 
        playlists p ON ps.playlist_id = p.id
      WHERE 
        ps.playlist_id = ?;
      `;

    db.query(query, [playlistId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  removeSongFromAllPlaylists: (songId, callback) => {
    const query = `DELETE FROM playlist_song WHERE song_id = ?`;
    db.query(query, [songId], callback);
  },
  addSongToPlaylists: (songId, playlistIds, callback) => {
    const values = playlistIds.map((playlistId) => [playlistId, songId]);
    const query = `INSERT INTO playlist_song (playlist_id, song_id) VALUES ?`;

    db.query(query, [values], callback);
  },
};
