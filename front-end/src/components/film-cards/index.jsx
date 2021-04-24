import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
const noPoster = require('../../assets/images/noPoster.png')

function FilmCards(props) {
    const { movieData, componentCaller } = props;
    
    return (
        <Link to={`/${componentCaller}/film-details/${movieData.imdbID}`} className="film-details-link">
            <div className="film-card">
                <img src={movieData.Poster !== "N/A" ? movieData.Poster : noPoster} alt=""/>
                <div className="film-info">
                    <strong>{movieData.Title}</strong>
                    <p>({movieData.Year})</p>
                </div>
            </div>
        </Link>
    )
}

export default FilmCards