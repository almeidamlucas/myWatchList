require('dotenv').config();
import axios from 'axios';
import { Request, Response } from 'express';
import WatchList from '../../models/watch-list/index'

const apiKey: any = process.env.API_KEY;

const listWatchList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await WatchList.find()
            .sort({Title: 1});

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const listMoviesBySearchTerm = async (req: Request, res: Response): Promise<Response> => {
    const { searchTerm } = req.params;
    try {
        const result = await WatchList.find({
            Title: {$regex: new RegExp(searchTerm, "i")}
        });

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const addToWatchList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = WatchList.create(req.body);
        
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getWatchListMovie = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await WatchList.findOne({
            imdbID: req.params.id
        });

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await WatchList.deleteOne({
            imdbID: req.params.id
        });

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const listFilmListBySearchTerm = async (req: Request, res: Response): Promise<Response> => {
    const { searchTerm } = req.params;
    try {
        const result = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${searchTerm}`);

        return res.status(200).send(result.data);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getFilmListMovie = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const result = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&i=${id}&plot=full`);

        return res.status(200).send(result.data);
    } catch (error) {
        return res.status(500).send(error);
    }
};

export {
    listWatchList,
    listMoviesBySearchTerm,
    addToWatchList,
    getWatchListMovie,
    deleteMovie,
    listFilmListBySearchTerm,
    getFilmListMovie
};