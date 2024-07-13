import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import imdb from './imdb.svg';
import { Container, CircularProgress, Typography, CardMedia, Box, Grid, Button, IconButton, Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import './MovieDetails.css';
import { BookmarkAdded } from "@mui/icons-material";
import axios from "axios";
import MessageModal from "../../components/messageModal/MessageModal";
import api from '../../app/http';
import ScrollTop from '../../components/scrollTop/scrollTop';


const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllCast, setShowAllCast] = useState(false);
    const [playMovie, setPlayMovie] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [showMoreSimilar, setShowMoreSimilar] = useState(false);
    const tokenAuth = localStorage.getItem('Auth');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [open, setOpen] = useState(false);

    const [film, setFilm] = useState()
    const [trailer, setTrailer] = useState()
    const [poster, setPoster] = useState()



    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const dbMovieResponse = await api.get(`/film/get/${id}`);
                    setMovie(dbMovieResponse.data);
                    // getTrailer()
                    // getFilm()
                    // getPoster()
                    setLoading(false);
               
            } catch (error) {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    function getTrailer(){
        axios.get(`http://localhost:8080/api/file/film/${id}/trailer`)
            .then(response => {
                    setTrailer(response.config.url);
                    console.log(response.config);
                }
            );
    }

    const getFilm = async ()=>{
        const response = api.get(`file/film/${id}/film`, {
            headers: {'Authorization': `Basic ${tokenAuth}`,'Range': 'bytes=0-520'},
        })
        setFilm(response.data.config.url);
    }

    function getPoster(){
        axios.get(`http://localhost:8080/api/file/film/${id}/poster`)
            .then(response => {
                console.log(response.data);
                setPoster(response.data);
            })
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleWatchClicked() {
        axios.get("http://localhost:8080/api/user/get", {
            headers: { 'Authorization': `Basic ${tokenAuth}` }
        }).then(resp => {
            if (resp.request.responseURL === 'http://localhost:8080/api/user/get') {
                setPlayMovie(true)
            }
            else{
                handleOpen()
            }
        })
            .catch(reason => {
                handleOpen()
            })
    }

    const handleClick = () => {
        setIsBookmarked(!isBookmarked);
        console.log(`id ${id}`)

        if (isBookmarked) {
            axios.post("http://localhost:8080/api/user/removeFilmIdFromUserList",
                { filmId: id }, { headers: { 'Authorization': `Basic ${tokenAuth}` } })
                .then(res => {
                    console.log("Film removed successfully");
                })
                .catch(error => {
                    console.error("Error removing film:", error);
                });
        } else {
            axios.post("http://localhost:8080/api/user/addFilmIdToUserList",
                { filmId: id }, { headers: { 'Authorization': `Basic ${tokenAuth}` } })
                .then(res => {
                    console.log("Film added successfully");
                })
                .catch(error => {
                    console.error("Error adding film:", error);
                });
        }
    }




    

    // const director = credits?.crew?.filter(person => person.job === 'Director') || [];
    // const castWithPhoto = credits?.cast?.filter(actor => actor.profile_path) || [];
    // const sortedCast = castWithPhoto;


    const renderSimilarMovies = () => {
        return similarMovies.filter(m => m.id !== movie.id).slice(0, showMoreSimilar ? similarMovies.length : 6).map(similarMovie => (
            <Grid item key={similarMovie.id} xs={6} sm={4} md={3} lg={2}>
                <Link to={`/movies/${similarMovie.id}`}>
                    <Box display="flex" flexDirection="column" alignItems="left">
                        <CardMedia
                            component="img"
                            height="300px"
                            image={similarMovie.poster_path ? `https://image.tmdb.org/t/p/w185${similarMovie.poster_path}` : 'https://via.placeholder.com/150x225?text=No+Image'}
                            title={similarMovie.title}
                        />
                        <Typography variant="body2" align="left" noWrap>{similarMovie.title}</Typography>
                    </Box>
                </Link>
            </Grid>
        ));
    };

    if (loading) {
        return (
            <Container maxWidth="lg">
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <MessageModal message={"Для перегляду фільмів потрібна підписка"} open={open} onClose={handleClose}></MessageModal>

            {/* <Box className="trailer-section">
                {playMovie ? (
                    <video controls src={film} height={501} width={"100%"}></video>
                ) : (
                    <Box position="relative" display="flex" alignItems="center" justifyContent="center">
                        {trailer ? (
                            <video controls src={trailer} autoPlay height={501} width={"100%"}></video>
                        ) : (
                            <CardMedia
                                component="img"
                                src={poster}
                                title={movie.title}
                                className="poster-overlay"
                            />
                        )}
                    </Box>
                )}
            </Box> */}

            {/* <Box className="trailer-buttons">
                <Button color="secondary" style={{ marginBottom: '10px' }} onClick={() => handleWatchClicked()}>
                    Дивитись
                </Button>
                <Box textAlign="center" color="#FFFFFF" onClick={handleClick} style={{ cursor: 'pointer' }}>
                    {isBookmarked ? <BookmarkAdded fontSize="large" /> :
                        <BookmarkBorderIcon fontSize="large" />}
                    <Typography variant="body2">Обране</Typography>
                </Box>
                <Box textAlign="center" color="#FFFFFF">
                    <ThumbUpIcon fontSize="large" />
                    <Typography variant="body2">👍 {movie.likeVote}</Typography>
                </Box>
                <Box textAlign="center" color="#FFFFFF">
                    <ThumbDownIcon fontSize="large" />
                    <Typography variant="body2">👎 {movie.dislikeVote}</Typography>
                </Box>
            </Box> */}

            <Box className="divider"></Box>

            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} mt={2}>
                <Box flex={1} color="#FFFFFF" pr={{ md: 2 }}>
                    <Typography variant="h4" gutterBottom>{movie.title}</Typography>
                    <Typography variant="h6" gutterBottom>{movie.originalTitle}</Typography>
                    <Typography variant="body1" gutterBottom>{movie.description}</Typography>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="body2"
                                    gutterBottom>Рейтинги:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.voteAverage}
                            <img src={imdb} alt="IMDB Logo" className="imdb-logo"/></Typography>
                        <Typography variant="body2" gutterBottom>Дата виходу:&nbsp;&nbsp;{movie.releaseDate}</Typography>
                        <Typography variant="body2"
                            gutterBottom>Країна:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.countries ? movie.countries.map(country => country.name).join(', ') : 'N/A'}</Typography>
                        <Typography variant="body2"
                            gutterBottom>Вік:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.adult ? '18+' : 'Всі віки'}</Typography>
                        <Typography variant="body2"
                            gutterBottom>Жанри:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'N/A'}</Typography>
                        <Typography variant="body2"
                            gutterBottom>Тривалість:&nbsp;&nbsp; {movie.runtime} хв.</Typography>
                    </Box>
                </Box>


                {/* <Box flex={1} color="#FFFFFF">
                    <Typography variant="h5" gutterBottom>Режисери:</Typography>
                    <Grid container spacing={2}>
                        {regisseurs.map(person => (
                            <Grid item key={person.id} xs={6} sm={4} md={3} lg={2}>
                                <Link to={`/person/${person.id}`} className="person-link">
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Avatar
                                            src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/150x225?text=No+Image'}
                                            alt={person.name}
                                            className="person-image"
                                            sx={{width: 85, height: 85}}
                                        />
                                        <Typography variant="body2" align="center">{person.name}</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>

                    <Typography variant="h5" gutterBottom>У ролях:</Typography>
                    <Grid container spacing={2}>
                        {Actors.map(actor => (
                            <Grid item key={actor.cast_id} xs={6} sm={4} md={3} lg={2}>
                                    <Box display="flex" flexDirection="column" alignItems="center">

                                        <Avatar
                                            src={actor.photo ? actor.photo : 'https://via.placeholder.com/150x225?text=No+Image'}
                                            alt={actor.name}
                                            className="person-image"
                                            sx={{ width: 85, height: 85 }}
                                        />
                                        <Typography variant="body2" align="center">{actor.name}</Typography>
                                    </Box>
                            </Grid>
                        ))}
                    </Grid>
                    {sortedCast.length > 4 && (
                        <Box mt={2} textAlign="center">
                            <Button variant="outlined" onClick={() => setShowAllCast(!showAllCast)}
                                style={{ color: '#FFFFFF' }}>
                                {showAllCast ? 'Показати менше' : 'Показати більше'}
                            </Button>
                        </Box>
                    )}
                </Box> */}
                
            </Box>

            <Box className="divider"></Box>
            {/* <Box mt={2} color="#FFFFFF">
                <Typography variant="h5" gutterBottom>Схожі фільми:</Typography>
                <Grid container spacing={2}>
                    {renderSimilarMovies()}
                </Grid>
                {similarMovies.length > 6 && (
                    <Box mt={2} textAlign="center">
                        <Button variant="outlined" onClick={() => setShowMoreSimilar(!showMoreSimilar)}
                            style={{ color: '#FFFFFF' }}>
                            {showMoreSimilar ? 'Показати менше' : 'Показати більше'}
                        </Button>
                    </Box>
                )}
            </Box> */}
            <Box className="divider"></Box>
            <ScrollTop />
        </Container>
    );
}

export default MovieDetails;
