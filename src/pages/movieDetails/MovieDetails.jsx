// MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, CardMedia, Box } from '@mui/material';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const director = credits?.crew.find(person => person.job === 'Director');
    const cast = credits?.cast.slice(0, 5).map(actor => actor.name).join(', ');

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
                    {movie?.vote_average && <Typography variant="body2">Рейтинги: {movie.vote_average}</Typography>}
                    {movie?.release_date && <Typography variant="body2">Дата виходу: {movie.release_date}</Typography>}
                    {movie?.production_countries.length > 0 && <Typography variant="body2">Країна: {movie.production_countries.map(country => country.name).join(', ')}</Typography>}
                    {director?.name && <Typography variant="body2">Режисер: {director.name}</Typography>}
                    {movie?.adult !== undefined && <Typography variant="body2">Вік: {movie.adult ? '18+' : 'Всі віки'}</Typography>}
                    {movie?.runtime && <Typography variant="body2">Тривалість: {movie.runtime} хв.</Typography>}
                    {cast && <Typography variant="body2">У ролях: {cast}</Typography>}
                </Box>
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
