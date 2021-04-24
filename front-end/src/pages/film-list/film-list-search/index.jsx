import React, { useState } from 'react'
import api from '../../../services/api';
import './styles.css'
import FilmCards from '../../../components/film-cards'
import MovieNotFound from '../../../components/movie-not-found'

function FilmList() {
    const [isLoading, setIsLoading] = useState(false)
    const [movieNotFound, setMovieNotFound] = useState(false)
    const [inputText, setInputText] = useState('')
    const [moviesData, setMoviesData] = useState([])
    let searchInput = React.createRef() 

    async function getMovieList() {
        if (inputText) {
            setIsLoading(true)
            try {
                const result = await api.get(`/film-list/select/movies/${inputText}`);

                if (result.data.Error === "Movie not found!") {
                    setMovieNotFound(true)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    setMovieNotFound(false)
                    const formattedMovieCards = removeDuplicateData(result.data.Search, 'imdbID')
                    setMoviesData(formattedMovieCards)
                }
  
            } catch (error) {
                setIsLoading(false)
                setMovieNotFound(false)
            }
        }    
    }

    function removeDuplicateData(array, comparison) {
        const uniqueData =  array.map(e => e[comparison])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => array[e]).map(e => array[e]);

        return uniqueData;
    }

    function clearInput() {
        setInputText('')
        searchInput.current.focus()
    }

    function keyUpHandler(e) {
        if (e.key === 'Enter') {
            getMovieList()
        }
    }

    return (
        <main>
            <h1>Search for a movie</h1>
            <div className="search-form">
                <div className="search-bar">
                    <input type="text" name="search-input" id="search-input" height="30px" value={inputText} ref={searchInput} onChange={(e) => setInputText(e.target.value)} onKeyUp={keyUpHandler}/>

                    <div className="clear-search"><i className={inputText ? "far fa-times-circle" : ""} onClick={clearInput}></i></div>
                    
                    <button className="search" onClick={getMovieList}><i className={isLoading ? 'fa fa-spinner fa-spin fa-pulse fa-lg' : 'fa fa-search '}></i></button>
                </div>
            </div>
            <hr/>
            
            <div className={movieNotFound ? 'movie-not-found' : 'film-list'}>
                {
                    movieNotFound ?
                    <MovieNotFound></MovieNotFound> :
                    moviesData.map(movieData => {
                        return <FilmCards key={movieData.imdbID} movieData={movieData} componentCaller="film-list"></FilmCards>
                    })
                }
            </div>
        </main>
    )
}

export default FilmList