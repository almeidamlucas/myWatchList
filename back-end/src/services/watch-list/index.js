require('dotenv').config();
const axios = require('axios');
const WatchList = require ('../../models/watch-list/index')

const apiKey = process.env.API_KEY;

const listWatchList = async (req, res) => {
    try {
        const result = await WatchList.find()
            .sort({Title: 1})

        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const listMoviesBySearchTerm = async (req, res) => {
    const { searchTerm } = req.params;
    try {
        const result = await WatchList.find({
            Title: {$regex: new RegExp(searchTerm, "i")}
        });

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const addToWatchList = async (req, res) => {
    try {
        const result = WatchList.create(req.body);
        
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getWatchListMovie = async (req, res) => {
    try {
        const result = await WatchList.findOne({
            imdbID: req.params.id
        });

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const deleteMovie = async (req, res) => {
    try {
        const result = await WatchList.deleteOne({
            imdbID: req.params.id
        });

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const listFilmListBySearchTerm = async (req, res) => {
    const { searchTerm } = req.params;
    try {
        const result = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${searchTerm}`);

        return res.status(200).send(result.data);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getFilmListMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&i=${id}&plot=full`);

        return res.status(200).send(result.data);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    listWatchList,
    listMoviesBySearchTerm,
    addToWatchList,
    getWatchListMovie,
    deleteMovie,
    listFilmListBySearchTerm,
    getFilmListMovie
}