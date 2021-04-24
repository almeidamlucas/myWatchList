import React, { useState, useEffect } from 'react'
import FilmDetails from '../../../components/film-details'
import { ToastContainer, toast, Slide } from 'react-toastify';
import api from '../../../services/api';

function WatchListDetails(props) {
    const {match, history} = props
    const [isLoading, setIsLoading] = useState(true)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [model, setModel] = useState('')
    const [genreList, setGenreList] = useState([])

    useEffect(() => {
        function getMovieData() {
            setIsLoading(true)
            const movieId = match.params.id
            api.get(`/watch-list/select/movie/${movieId}`)
                .then(result => {
                    if (!result.data) {
                        toast.warning(notificationText('fas fa-exclamation-triangle', 'No data available'), {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: true,
                            pauseOnHover: false,
                            transition: Slide
                            })

                        setTimeout(() => {
                            history.push('/watch-list')
                        }, 2000);
                        
                    } else {
                        setModel(result.data)
                        const formattedGenreList = result.data.Genre.split(',').map(genre => genre.trim())
                        setGenreList(formattedGenreList)
                        setIsLoading(false)
                    }
                    
                })
                .catch(() => {
                    setIsLoading(false);
                })
        }

        getMovieData()
    }, [match.params.id, history])

    function goBackLocation() {
        history.goBack()
    } 

    function handleData(data) {
        removeFromWatchList(data)
    }

    async function removeFromWatchList(data) {
        setButtonLoading(true)
        try {
            await api.delete(`/watch-list/delete/movie/${data.imdbID}`);

            setButtonLoading(false);
            toast.success(notificationText('fas fa-exclamation-triangle', 'Removed from your Watch List'), {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                pauseOnHover: false,
                transition: Slide
            });

            setTimeout(() => {
                history.push('/watch-list');
            }, 1000);
        } catch (error) {
            setButtonLoading(false);
            toast.error(notificationText('fas fa-exclamation-triangle', 'Failed to remove. Try again later'), {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                pauseOnHover: false,
                transition: Slide
            });
        }
    }

    const notificationText = (icon, text) => {
        return (
        <>
            <i className={icon}></i><span className="notification-text">{text}</span>
        </>
        )
    }

    return (<div className="film-list-details">
    <FilmDetails 
        backButtonClicked={goBackLocation} 
        removeButtonClicked={handleData}
        match={match} 
        isLoading={isLoading}
        buttonLoading={buttonLoading}
        data={model} 
        genreList={genreList}
        isWatchList={true}>
    </FilmDetails>
    <ToastContainer/>
    </div>
)
}

export default WatchListDetails