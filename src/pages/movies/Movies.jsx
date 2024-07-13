import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Pagination, Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Movies.css';
import Movie from '../../components/movie/Movie';
import api from '../../app/http';
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
                // Получение фильмов из базы данных
                const response = await api.get('film/all');
                setMovies(response.data);
                // setTotalPages(data.total_pages);
                setLoading(false);
            } catch (error) {
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

    const onFilterChange = (dataFilter) => {
        setMovies(dataFilter);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <h1 className='textwhite'>Фільми</h1>
            {/* <Navigation onFilterChange={onFilterChange} /> */}
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
                style={{ marginTop: '40px', marginLeft: "auto" }}
            />
            <Box className="divider"></Box>
            
        </Container>
    );
};

export default Movies;