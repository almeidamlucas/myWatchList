import React, { useState, useEffect } from 'react';
import FilmDetails from '../../../components/film-details'
import { ToastContainer, toast, Slide } from 'react-toastify';
import api from '../../../services/api'
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function FilmListDetails(props) {
    const {match, history} = props;
    const [isLoading, setIsLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [model, setModel] = useState('');
    const [genreList, setGenreList] = useState([]);
    const [isMovieInWatchList, setIsMovieInWatchList] = useState(false);

    useEffect(() => {
        function getMovieData() {
            setIsLoading(true);
            const movieId = match.params.id;

            api.get(`/film-list/select/movie/${movieId}`)
                .then(async result => {
                    if (!result.data) {
                        toast.warning(notificationText('fas fa-exclamation-triangle', 'No data available'), {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: true,
                            pauseOnHover: false,
                            transition: Slide
                            })

                        setTimeout(() => {
                            history.push('/film-list');
                        }, 2000);
                    } else {
                        setModel(result.data);
                        const formattedGenreList = result.data.Genre.split(',').map(genre => genre.trim());
                        setGenreList(formattedGenreList);
                        const lockAddButton = await checkIfMovieIsAlreadyInWatchList(movieId);
                        if (lockAddButton) {
                            setIsMovieInWatchList(true);
                        }
                        setIsLoading(false);
                    }
                    
                })
                .catch(() => {
                    setTimeout(() => {
                        history.push('/film-list');
                    }, 2000);
                })
        }
        
        getMovieData();
    //eslint-disable-next-line
    },[match.params.id])
    
    function goBackLocation() {
        history.goBack();
    } 

    function handleData(data) {
        addToWatchList(data);
    }

    async function addToWatchList(data) {
        setButtonLoading(true);
        const isDuplicatedMovie = await checkIfMovieIsAlreadyInWatchList(data.imdbID);

        if (isDuplicatedMovie) {
            setButtonLoading(false);
            toast.warning(notificationText('fas fa-exclamation-triangle', 'Movie already added to your Watch List'), {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                pauseOnHover: false,
                transition: Slide
            });
        } else {
            await api.post('/watch-list/insert/movie', data)
                .then(() => {
                    setButtonLoading(false);
                    setIsMovieInWatchList(true);
                    toast.success(notificationText('fas fa-check', 'Added to your Wath List'), {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        pauseOnHover: false,
                        transition: Slide
                    });
                }).catch(() => {
                    setButtonLoading(false);
                    toast.error(notificationText('fas fa-exclamation-triangle', 'Failed to add to your watch list'), {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        pauseOnHover: false,
                        transition: Slide
                    });
                })
            
        }

    }

    async function checkIfMovieIsAlreadyInWatchList(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await api.get('watch-list/select/movie/' + id);
                resolve(result.data);
            } catch (error) {
                setButtonLoading(false);
                toast.error(notificationText('fas fa-exclamation-triangle', 'Unknown error. Try again later'), {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    pauseOnHover: false,
                    transition: Slide
                })
                reject(error);
            }
        }) 
    }

    const notificationText = (icon, text) => {
        return (
        <>
            <i className={icon}></i><span className="notification-text">{text}</span>
        </>
        )
    }

    return (
        <div className="film-list-details">
            <FilmDetails 
                backButtonClicked={goBackLocation} 
                addButtonClicked={handleData} 
                match={match} 
                isLoading={isLoading}
                buttonLoading={buttonLoading}
                data={model} 
                genreList={genreList}
                isMovieInWatchList={isMovieInWatchList}
                isWatchList={false}>
            </FilmDetails>
            <ToastContainer/>
        </div>
    )
}

export default FilmListDetails