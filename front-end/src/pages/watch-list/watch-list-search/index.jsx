import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './styles.css';
import FilmCards from '../../../components/film-cards';
import MovieNotFound from '../../../components/movie-not-found';

function WatchList() {
    const [isLoading, setIsLoading] = useState(false)
    const [movieNotFound, setMovieNotFound] = useState(false)
    const [inputText, setInputText] = useState('')
    const [moviesData, setMoviesData] = useState([])
    let searchInput = React.createRef()

    useEffect(() => {
        getWatchList()
    },[])

    async function getWatchList() {
        try {
            const result = await api.get('/watch-list/select/movies')
        
            setMovieNotFound(false)
            setMoviesData(result.data)
        } catch (error) {
            
        }
    }

    async function searchForMovies() {
        if (inputText) {
            setIsLoading(true)
            try {
                const result = await api.get(`watch-list/select/movies/${inputText}`);

                if (result.data.length < 1) {
                    setMovieNotFound(true)
                    setIsLoading(false)
                } else {
                    setMovieNotFound(false)
                    setIsLoading(false)
                    setMoviesData(result.data)
                }
            } catch (error) {
                
            }
        }
        
    }

    function clearInput() {
        setInputText('')
        searchInput.current.focus()
        getWatchList()
    }

    function keyUpHandler(e) {
        if (e.key === 'Enter') {
            searchForMovies()
        }

        if (inputText.length < 1) {
            getWatchList()
        }
    }

    return (
        <main>
            <h1>Your Watch List</h1>
            <div className="search-form">
                <div className="search-bar">
                    <input type="text" name="search-input" id="search-input" height="30px" value={inputText} ref={searchInput} onChange={(e) => setInputText(e.target.value)} onKeyUp={keyUpHandler}/>

                    <div className="clear-search"><i className={inputText ? "far fa-times-circle" : ""} onClick={clearInput}></i></div>
                    
                    <button className="search" onClick={searchForMovies}><i className={isLoading ? 'fa fa-spinner fa-spin fa-pulse fa-lg' : 'fa fa-search '}></i></button>
                </div>
            </div>
            <hr/>
            
            <div className={movieNotFound ? 'movie-not-found' : 'film-list'}>
                {
                    movieNotFound ?
                    <MovieNotFound></MovieNotFound> :
                    moviesData.map(movieData => {
                        return <FilmCards key={movieData.imdbID} movieData={movieData} componentCaller="watch-list"></FilmCards>
                    })
                }
            </div>
        </main>
    )
}

export default WatchList