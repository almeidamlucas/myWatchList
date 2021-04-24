const express = require('express')
const router = express.Router()

const WatchListService = require('../../services/watch-list/index')

router.get('/watch-list/select/movies', WatchListService.listWatchList);
router.get('/watch-list/select/movies/:searchTerm', WatchListService.listMoviesBySearchTerm);
router.get('/watch-list/select/movie/:id', WatchListService.getWatchListMovie);
router.post('/watch-list/insert/movie', WatchListService.addToWatchList);
router.delete('/watch-list/delete/movie/:id', WatchListService.deleteMovie);
router.get('/film-list/select/movies/:searchTerm', WatchListService.listFilmListBySearchTerm);
router.get('/film-list/select/movie/:id', WatchListService.getFilmListMovie);

module.exports = router