import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Card, CardContent, Typography, CardMedia, TextField, Button } from '@mui/material';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=uk-UA&page=${page}&with_genres=${genre}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const data = await response.json();
                console.log(data);  // Отладка
                setMovies(data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page, genre]);

    const handlePageChange = (event) => {
        setPage(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleSearch = () => {
        setLoading(true);
        setPage(1);
        setGenre(genre);
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
            <h1>Фільми</h1>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Кількість сторінок"
                    type="number"
                    value={page}
                    onChange={handlePageChange}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Жанр"
                    type="text"
                    value={genre}
                    onChange={handleGenreChange}
                    style={{ marginRight: '10px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Пошук
                </Button>
            </div>
            <Grid container spacing={4}>
                {movies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="500"
                                image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                                alt={movie.title}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {movie.overview}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Movies;
