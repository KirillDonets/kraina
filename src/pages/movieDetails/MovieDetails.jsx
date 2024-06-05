// MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, Card, CardMedia, Box } from '@mui/material';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=uk-UA`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const data = await response.json();

                setMovie(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
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

    return (
        <Container maxWidth="lg">
            <Box display="flex" alignItems="center">
                {movie && movie.poster_path && (
                    <CardMedia
                        component="img"
                        height="500"
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        title={movie.title}
                    />
                )}
                <Box ml={2}>
                    <Typography variant="h4" gutterBottom>{movie.title}</Typography>
                    <Typography variant="body1">{movie.overview}</Typography>
                    <CardMedia
                        component="iframe"
                        height="315"
                        src={`https://www.youtube.com/watch?v=Ed-rbhWhzTU/${movie.trailer}`}
                        title="Movie Trailer"
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default MovieDetails;
