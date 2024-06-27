import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import imdb from './imdb.svg';
import testVideo from './test-video.mp4';
import { Container, CircularProgress, Typography, CardMedia, Box, Grid, Button, IconButton, Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './MovieDetails.css';
import {apiKey, token, baseUrl} from '../../app/http';


const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllCast, setShowAllCast] = useState(false);
    const [playMovie, setPlayMovie] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [showMoreSimilar, setShowMoreSimilar] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`${baseUrl}/tv/${id}?api_key=${apiKey}&language=uk-UA&append_to_response=videos`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const data = await response.json();

                const creditsResponse = await fetch(`${baseUrl}/tv/${id}/credits?api_key=${apiKey}&language=uk-UA`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const creditsData = await creditsResponse.json();
                setMovie(data);
                    setCredits(creditsData);
                setLoading(false);

                const keywordResponse = await fetch(`${baseUrl}/tv/${id}/keywords?api_key=${apiKey}`);
                const keywordData = await keywordResponse.json();

                if (keywordData.results && keywordData.results.length > 0) {
                    const firstKeyword = keywordData.results[0].id;
                    const similarResponse = await fetch(`${baseUrl}/discover/tv?api_key=${apiKey}&with_keywords=${firstKeyword}&language=uk-UA`);
                    const similarData = await similarResponse.json();
                    setSimilarMovies(similarData.results.filter(m=>m.id!==data.id));
                }
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

    const renderSimilarMovies = () => {
        return similarMovies.slice(0, showMoreSimilar ? similarMovies.length : 6).map(similarMovie => (
            <Grid item key={similarMovie.id} xs={6} sm={4} md={3} lg={2}>
                <Link to={`/tv/${similarMovie.id}`}>
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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Container maxWidth="lg">
            <Box className="trailer-section">
                {playMovie ? (
                    <CardMedia
                        component="video"
                        src={testVideo}
                        autoPlay
                        controls
                        loop
                        style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                    />
                ) : (
                    <Box position="relative" display="flex" alignItems="center" justifyContent="center">
                        {videos.length > 0 ? (
                            <CardMedia
                                component="iframe"
                                src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1&mute=1&loop=1&playlist=${videos[0].key}`}
                                title="Трейлер фільму"
                                allow="fullscreen"
                                style={{ width: '100%', height: '501px', border: 'none' }}
                            />
                        ) : (
                            <CardMedia
                                component="img"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                title={movie.title}
                                className="poster-overlay"
                            />
                        )}
                        <Box className="trailer-buttons">
                            <Button color="secondary" style={{ marginBottom: '10px' }} onClick={() => setPlayMovie(true)}>
                                Дивитись
                            </Button>
                            <Box textAlign="center" color="#FFFFFF">
                                <BookmarkBorderIcon fontSize="large" />
                                <Typography variant="body2">Обране</Typography>
                            </Box>
                            <Box textAlign="center" color="#FFFFFF">
                                <ThumbUpIcon fontSize="large" />
                                <Typography variant="body2">👍 120</Typography>
                            </Box>
                            <Box textAlign="center" color="#FFFFFF">
                                <ThumbDownIcon fontSize="large" />
                                <Typography variant="body2">👎 30</Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
            <Box className="divider"></Box>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} mt={2}>
                <Box flex={1} color="#FFFFFF" pr={{ md: 2 }}>
                    <Typography variant="h4" gutterBottom>{movie.name}</Typography>
                    <Typography variant="h6" gutterBottom>{movie.original_name}</Typography>
                    <Typography variant="body1" gutterBottom>{movie.overview}</Typography>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="body2" gutterBottom>Рейтинги:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.vote_average} <img src={imdb} alt="IMDB Logo" className="imdb-logo" /></Typography>
                        <Typography variant="body2" gutterBottom>Дата виходу:&nbsp;&nbsp;{movie.release_date}</Typography>
                        <Typography variant="body2" gutterBottom>Країна:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.production_countries.map(country => country.name).join(', ')}</Typography>
                        <Typography variant="body2" gutterBottom>Вік:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.adult ? '18+' : 'Всі віки'}</Typography>
                        <Typography variant="body2" gutterBottom>Жанри:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.genres.map(genre => genre.name).join(', ')}</Typography>
                        <Typography variant="body2" gutterBottom>Тривалість:&nbsp;&nbsp; {movie.runtime} хв.</Typography>
                    </Box>
                </Box>
                <Box flex={1} color="#FFFFFF">
                    <Typography variant="h5" gutterBottom>Режисери:</Typography>
                    <Grid container spacing={2}>
                        {movie.created_by.map(person => (
                            <Grid item key={person.id} xs={6} sm={4} md={3} lg={2}>
                                <Link to={`/person/${person.id}`} className="person-link">
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Avatar
                                            src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/150x225?text=No+Image'}
                                            alt={person.name}
                                            className="person-image"
                                            sx={{ width: 85, height: 85 }}
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
                                        <Avatar
                                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/150x225?text=No+Image'}
                                            alt={actor.name}
                                            className="person-image"
                                            sx={{ width: 85, height: 85 }}
                                        />
                                        <Typography variant="body2" align="center">{actor.name}</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                    {sortedCast.length > 4 && (
                        <Box mt={2} textAlign="center">
                            <Button variant="outlined" onClick={() => setShowAllCast(!showAllCast)} style={{ color: '#FFFFFF' }}>
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
                    {renderSimilarMovies()}
                </Grid>
                {similarMovies.length > 6 && (
                    <Box mt={2} textAlign="center">
                        <Button variant="outlined" onClick={() => setShowMoreSimilar(!showMoreSimilar)} style={{ color: '#FFFFFF' }}>
                            {showMoreSimilar ? 'Показати менше' : 'Показати більше'}
                        </Button>
                    </Box>
                )}
            </Box>
            <Box className="divider"></Box>
            <IconButton
                color="primary"
                onClick={scrollToTop}
                style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#FFFFFF' }}
            >
                <ArrowUpwardIcon />
            </IconButton>
        </Container>
    );
}

export default MovieDetails;
