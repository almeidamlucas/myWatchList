import React from 'react';
import './styles.css'
const noPoster = require('../../assets/images/noPoster.png')

function FilmDetails(props) {
    const { backButtonClicked, addButtonClicked, removeButtonClicked, isLoading, buttonLoading, data, genreList, isMovieInWatchList, isWatchList } = props;

    const loadingData = () => {
        return (
            <div className="loading-div">
                <i className="fa fa-spinner fa-spin fa-pulse fa-lg loading-data"></i>
            </div>
        )
    }

    if (isLoading) {
        return loadingData()
    } else {
        return (
            <>
            <div className="film-details">
                <aside>
                    <img src={data.Poster !== "N/A" ? data.Poster : noPoster} alt=""/>

                    <div className="run-time">
                        <h3>Runtime: {data.Runtime}</h3>
                        <h3>{data.Rated !== "N/A" ? `Rated: ${data.Rated}` : ""}</h3>
                    </div>
                </aside>

                <div className="film-data">
                    <div className="title">
                        <h1>{data.Title}</h1>
                        <h3>Release Date: {data.Released}</h3>
                    </div>

                    <div className="genre-list">
                        {
                            genreList.map((genre, index) => {
                            return <p key={index}> {genre}</p>
                            })
                        }
                    </div>

                    <div className="plot">
                        <p>{data.Plot !== "N/A" ? data.Plot : "Plot not available"}</p>
                    </div>

                    <h3>
                        {data.imdbRating !== "N/A" ? `Rating: ${data.imdbRating}/10` : 'Rating not available'}
                    </h3>

                    <div className="run-time-small">
                        <h3>Runtime: {data.Runtime}</h3>
                        <h3>{data.Rated !== "N/A" ? `Rated: ${data.Rated}` : ""}</h3>
                    </div>

                    <div className="cast">
                        <h4>Cast:</h4> <p>{data.Actors}</p>
                    </div>

                    <div className="directed-by">
                        <h4>Directed by:</h4> <p>{data.Director}</p>
                    </div>
                    
                    <div className="details-buttons">
                        <button className="back-button"  onClick={() => backButtonClicked()}><i className="fa fa-arrow-left"></i> BACK</button>
                        {
                            isWatchList ? 
                                <button className="remove-button" disabled={buttonLoading} onClick={() => removeButtonClicked(data)}><i className={buttonLoading ? 'fa fa-spinner fa-spin fa-pulse' : 'fa fa-minus'}></i> REMOVE FROM WATCH LIST</button>
                            : 
                                isMovieInWatchList ?
                                    <button className="added-button"><i className="fas fa-check"></i> ADDED TO WATCH LIST</button>
                                    : 
                                    <button className="add-button" disabled={buttonLoading} onClick={() => addButtonClicked(data)}><i className={buttonLoading ? 'fa fa-spinner fa-spin fa-pulse' : 'fa fa-plus'}></i> ADD TO WATCH LIST</button>   
                        }
                    </div>
                </div>
            </div>

            </>
            )
    }
    
}

export default FilmDetails