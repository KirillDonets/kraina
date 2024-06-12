import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logoIMDB from './logoIMDB.png';
// import logoIMDB from './logoIMDB.png';
import { Container, CircularProgress, Typography, CardMedia, Box, Grid, Button } from '@mui/material';


const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllCast, setShowAllCast] = useState(false);

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
    const castWithoutPhoto = credits?.cast.filter(actor => !actor.profile_path);
    const sortedCast = [...castWithPhoto, ...castWithoutPhoto];

    return (
        <Container maxWidth="lg">
            <Box display="flex" alignItems="flex-start" mb={2}>
                {movie?.poster_path && (
                    <CardMedia
                        component="img"
                        height="500"
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        title={movie.title}
                    />
                )}
                <Box ml={2}>
                    {movie?.title && <Typography variant="h4" gutterBottom>{movie.title}</Typography>}
                    {movie?.original_title && <Typography variant="h6" gutterBottom>{movie.original_title}</Typography>}
                    {movie?.overview && <Typography variant="body1" gutterBottom>{movie.overview}</Typography>}
                    {movie?.vote_average && <Typography variant="body2">Рейтинги: {movie.vote_average} <img src={logoIMDB} alt="Логотип" className="logoIMDB"/></Typography>}
                    {movie?.release_date && <Typography variant="body2">Дата виходу: {movie.release_date}</Typography>}
                    {movie?.production_countries.length > 0 && <Typography variant="body2">Країна: {movie.production_countries.map(country => country.name).join(', ')}</Typography>}
                    {movie?.adult !== undefined && <Typography variant="body2">Вік: {movie.adult ? '18+' : 'Всі віки'}</Typography>}
                    {movie?.runtime && <Typography variant="body2">Тривалість: {movie.runtime} хв.</Typography>}
                </Box>
            </Box>
            <Box mt={2}>
                {movie?.videos?.results.length > 1 && (
                    <CardMedia
                        component="iframe"
                        src={`https://www.youtube.com/embed/${movie.videos.results[1].key}`}
                        title="Другий трейлер фільму"
                        allow="fullscreen"
                        style={{
                            width: '300px',
                            height: '200px'
                        }}
                    />
                )}
            </Box>
            <Box mt={2}>
                <Typography variant="h5" gutterBottom>Режисери:</Typography>
                <Grid container spacing={2}>
                    {director.map(person => (
                        <Grid item key={person.id} xs={6} sm={4} md={3} lg={2}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/150x225?text=No+Image'}
                                    title={person.name}
                                    style={{ borderRadius: '8px' }}
                                />
                                <Typography variant="body2" align="center">{person.name}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box mt={2}>
                <Typography variant="h5" gutterBottom>У ролях:</Typography>
                <Grid container spacing={2}>
                    {sortedCast.slice(0, showAllCast ? sortedCast.length : 6).map(actor => (
                        <Grid item key={actor.cast_id} xs={6} sm={4} md={3} lg={2}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/150x225?text=No+Image'}
                                    title={actor.name}
                                    style={{ borderRadius: '8px' }}
                                />
                                <Typography variant="body2" align="center">{actor.name}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {sortedCast.length > 5 && (
                    <Box mt={2} textAlign="center">
                        <Button variant="outlined" onClick={() => setShowAllCast(!showAllCast)}>
                            {showAllCast ? 'Показати менше' : 'Показати більше'}
                        </Button>
                    </Box>
                )}
            </Box>
            <Box mt={2} position="relative" paddingBottom="56.25%" height="0" overflow="hidden">
                {movie?.videos?.results.length > 0 && (
                    <CardMedia
                        component="iframe"
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                        title="Трейлер фільму"
                        allow="fullscreen"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                    />
                )}
            </Box>
            
        </Container>
    );
}

export default MovieDetails;
