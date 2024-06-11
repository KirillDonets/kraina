// Movies.js
import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Card, CardMedia, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState('');
    const [totalPages, setTotalPages] = useState(1);

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

                // Фильтрация фильмов, исключая мультфильмы
                const filteredMovies = data.results.filter(movie => !movie.genre_ids.includes(16));

                setMovies(filteredMovies);
                setTotalPages(data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page, genre]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
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
            <Grid container spacing={2} sx={{ rowGap: '50px' }}>
                {movies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2}>
                        <Link to={`/movies/${movie.id}`}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                                    alt={movie.title}
                                />
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px' }}
            />
        </Container>
    );
}

export default Movies;
