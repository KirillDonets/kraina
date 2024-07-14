import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Pagination, Box } from '@mui/material';
import './Series.css';
import api from '../../app/http';
import Movie from '../../components/movie/Movie';
import Navigation from '../../components/navigation/Navigation';
import ScrollTop from '../../components/scrollTop/scrollTop';
import { useLocation } from 'react-router-dom';

const MOVIES_PER_PAGE = 30;

const Series = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [yearFilter, setYearFilter] = useState([]);
    const [genreFilter, setGenreFilter] = useState([]);
    const [countryFilter, setCountryFilter] = useState([]);
    const location = useLocation()


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get('film/all');
                const filteredMovies = response.data.filter(movie => movie.type === 'series');
                setMovies(filteredMovies);
                setTotalPages(Math.ceil(filteredMovies.length / MOVIES_PER_PAGE));
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredMovie = (movie) => {
        const releaseYear = new Date(movie.releaseDate).getFullYear();
        const movieGenres = movie.genres.map(genre => genre.id);
        const movieCountries = movie.countries.map(country => country.id);

        return (
            (yearFilter.length > 0 ? yearFilter.includes(releaseYear) : true) &&
            (genreFilter.length > 0 ? genreFilter.some(genre => movieGenres.includes(genre)) : true) &&
            (countryFilter.length > 0 ? countryFilter.some(country => movieCountries.includes(country)) : true)
        );
    };

    const onFilterChange = ({ selectedGenres, selectedCountries, selectedYears }) => {
        setYearFilter(selectedYears);
        setGenreFilter(selectedGenres.map(genre => genre.id));
        setCountryFilter(selectedCountries.map(country => country.id));
    };

    const getCurrentPageMovies = () => {
        const startIndex = (page - 1) * MOVIES_PER_PAGE;
        const endIndex = startIndex + MOVIES_PER_PAGE;
        return movies.filter(filteredMovie).slice(startIndex, endIndex);

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
            <h1 className='textwhite'>Серіали</h1>
            {location.pathname !== '/homePage' && <Navigation onFilterChange={onFilterChange} />}

            <Box className="divider"></Box>
            <Grid container spacing={2} sx={{ rowGap: '50px' }}>
                {getCurrentPageMovies().map(movie => (
                    <Movie movie={movie} key={movie.id} />
                ))}
            </Grid>
            {location.pathname !== '/homePage' &&<Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '40px', marginLeft: "auto" }}
            />}
            <Box className="divider"></Box>
            <ScrollTop />
        </Container>
        
    );
}

export default Series;
