import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import imdb from './imdb.svg';
import testVideo from './test-video.mp4';
import { Container, CircularProgress, Typography, CardMedia, Box, Grid, Button, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './MovieDetails.css';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllCast, setShowAllCast] = useState(false);
    const [playMovie, setPlayMovie] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=uk-UA&append_to_response=videos`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const data = await response.json();

                const creditsResponse = await fetch(`${baseUrl}/movie/${id}/credits?api_key=${apiKey}&language=uk-UA`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const creditsData = await creditsResponse.json();

                setMovie(data);
                setCredits(creditsData);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке данных о фильме:', error);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return (
            <Container maxWidth="lg">
                <CircularProgress />
            </Container>
        );
    }

    const director = credits?.crew.filter(person => person.job === 'Director');
    const castWithPhoto = credits?.cast.filter(actor => actor.profile_path);
    const sortedCast = castWithPhoto;

    const filterVideos = (videos) => {
        const ukrainianVideos = videos.filter(video => video.iso_639_1 === 'uk');
        if (ukrainianVideos.length > 0) return ukrainianVideos;

        const nonRussianVideos = videos.filter(video => video.iso_639_1 !== 'ru');
        return nonRussianVideos.length > 0 ? nonRussianVideos : videos;
    };

    const videos = movie?.videos?.results ? filterVideos(movie.videos.results) : [];

    return (
        <Container maxWidth="lg">
            <Box className="trailer-section">
                {playMovie ? (
                    <CardMedia
                        component="video"
                        src={testVideo}
                        autoPlay
                        controls
                        style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                    />
                ) : (
                    <Box position="relative" display="flex" alignItems="center" justifyContent="center">
                        <CardMedia
                            component="iframe"
                            src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1&mute=1`}
                            title="Трейлер фільму"
                            allow="fullscreen"
                            style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                        />
                        <CardMedia
                            component="img"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            title={movie.title}
                            className="poster-overlay"
                        />
                        <Box className="trailer-buttons">
                            <IconButton color="primary" onClick={() => setPlayMovie(true)}>
                                <PlayArrowIcon fontSize="large" />
                            </IconButton>
                            <IconButton color="secondary">
                                <FavoriteIcon fontSize="large" />
                            </IconButton>
                            <IconButton>
                                <ThumbUpIcon fontSize="large" />
                            </IconButton>
                            <IconButton>
                                <ThumbDownIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </Box>
            <Box className="divider"></Box>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} mt={2}>
                <Box flex={1} color="#FFFFFF" pr={{ md: 2 }}>
                    <Typography variant="h4" gutterBottom>{movie.title}</Typography>
                    <Typography variant="h6" gutterBottom>{movie.original_title}</Typography>
                    <Typography variant="body1" gutterBottom>{movie.overview}</Typography>
                    <Typography variant="body2" gutterBottom>Рейтинги: {movie.vote_average} <img src={imdb} alt="IMDB Logo" className="imdb-logo" /></Typography>
                    <Typography variant="body2" gutterBottom>Дата виходу: {movie.release_date}</Typography>
                    <Typography variant="body2" gutterBottom>Країна: {movie.production_countries.map(country => country.name).join(', ')}</Typography>
                    <Typography variant="body2" gutterBottom>Вік: {movie.adult ? '18+' : 'Всі віки'}</Typography>
                    <Typography variant="body2" gutterBottom>Тривалість: {movie.runtime} хв.</Typography>
                </Box>
                <Box flex={1} color="#FFFFFF">
                    <Typography variant="h5" gutterBottom>Режисери:</Typography>
                    <Grid container spacing={2}>
                        {director.map(person => (
                            <Grid item key={person.id} xs={6} sm={4} md={3} lg={2}>
                                <Link to={`/person/${person.id}`} className="person-link">
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            image={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/150x225?text=No+Image'}
                                            title={person.name}
                                            className="person-image"
                                        />
                                        <Typography variant="body2" align="center">{person.name}</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="h5" gutterBottom>У ролях:</Typography>
                    <Grid container spacing={2}>
                        {sortedCast.slice(0, showAllCast ? sortedCast.length : 4).map(actor => (
                            <Grid item key={actor.cast_id} xs={6} sm={4} md={3} lg={2}>
                                <Link to={`/person/${actor.id}`} className="person-link">
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            image={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/150x225?text=No+Image'}
                                            title={actor.name}
                                            className="person-image"
                                        />
                                        <Typography variant="body2" align="center">{actor.name}</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                    {sortedCast.length > 4 && (
                        <Box mt={2} textAlign="center">
                            <Button variant="outlined" onClick={() => setShowAllCast(!showAllCast)}>
                                {showAllCast ? 'Показати менше' : 'Показати більше'}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box className="divider"></Box>
            <Box mt={2} color="#FFFFFF">
                <Typography variant="h5" gutterBottom>Схожі фільми:</Typography>
                <Grid container spacing={2}>
                    
                </Grid>
            </Box>
        </Container>
    );
}

export default MovieDetails;
