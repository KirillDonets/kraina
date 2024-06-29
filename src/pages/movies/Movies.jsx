import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Card, CardMedia, Pagination, Box, CardContent, Typography, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link } from 'react-router-dom';
import './Movies.css';
import Movie from '../../components/movie/Movie';
import {apiKey, token, baseUrl} from '../../app/http';
import Navigation from '../../components/navigation/Navigation';

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
    const onFilterChange = (dataFilter)=>{
        setMovies(dataFilter)
    }
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <Container maxWidth="lg">
            <h1 className='textwhite'>Фільми</h1>
            <Navigation onFilterChange={onFilterChange}/>
            <Box className="divider"></Box>
            <Grid container spacing={2} sx={{ rowGap: '50px' }}>
                {movies.map(movie => (
                    <Movie movie={movie} key={movie.id} />
                ))}
            </Grid>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '40px', marginLeft:"auto" }}
            />
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

export default Movies;
