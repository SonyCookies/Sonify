const express = require("express");
const path = require("path");
const songRoute = require("../routes/song.route");
const mainRoute = require("../routes/main.route");
const playlistRoute = require("../routes/playlist.route");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join("app", "views"));
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join("public")));
app.use("/src", express.static(path.join("src")));

app.use(express.json());

app.use("/songs", songRoute);
app.use("/playlists", playlistRoute);
app.use("/", mainRoute);

module.exports = app;
