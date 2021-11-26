import { Schema, model, Document } from 'mongoose';
interface Movie extends Document {
    imdbID: string;
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    actors: string;
    plot: string;
    poster: string;
    imdbRating: string;
}

const WatchListSchema = new Schema<Movie>({
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

export default model('WatchList', WatchListSchema);