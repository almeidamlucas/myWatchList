const mongoose = require('mongoose');

const WatchListSchema = new mongoose.Schema({
    imdbID: {type: String, required: true},
    Title: {type: String, required: true},
    Year: {type: String, required: true},
    Rated: {type: String, required: true},
    Released: {type: String, required: true},
    Runtime: {type: String, required: true},
    Genre: {type: String, required: true},
    Director: {type: String, required: true},
    Actors: {type: String, required: true},
    Plot: {type: String, required: true},
    Poster: {type: String, required: true},
    imdbRating: {type: String, required: true},
})

module.exports = mongoose.model('WatchList', WatchListSchema)