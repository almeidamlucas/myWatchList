import { Router } from 'express';
import { addToWatchList, deleteMovie, getFilmListMovie, getWatchListMovie, listFilmListBySearchTerm, listMoviesBySearchTerm, listWatchList } from '../../services/watch-list';
const routes: Router = Router();

routes.get('/watch-list/select/movies', listWatchList);
routes.get('/watch-list/select/movies/:searchTerm', listMoviesBySearchTerm);
routes.get('/watch-list/select/movie/:id', getWatchListMovie);
routes.post('/watch-list/insert/movie', addToWatchList);
routes.delete('/watch-list/delete/movie/:id', deleteMovie);
routes.get('/film-list/select/movies/:searchTerm', listFilmListBySearchTerm);
routes.get('/film-list/select/movie/:id', getFilmListMovie);

export default routes;