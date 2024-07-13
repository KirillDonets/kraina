import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Pagination, Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Movies.css';
import Movie from '../../components/movie/Movie';
import api from '../../app/http';
import Navigation from '../../components/navigation/Navigation';
import ScrollTop from '../../components/scrollTop/scrollTop';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [yearFilter, setYearFilter] = useState([]);
    const [genreFilter, setGenreFilter] = useState([]);
    const [countryFilter, setCountryFilter] = useState([]);



    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Получение фильмов из базы данных
                const response = await api.get('film/all');
                setMovies(response.data.filter(movie=>movie.type==='movies'));
                // setTotalPages(data.total_pages);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };


    const filteredMovie = (movie)=> {
             return ( yearFilter.length>0 ? yearFilter.includes(+movie.releaseDate) : true) && 
             ( genreFilter.length>0 ? genreFilter.includes(+movie.genre_id) : true) &&   //!!!!
             ( countryFilter.length>0 ? countryFilter.includes(+movie.country_id) : true) // !!!!
    }

    const onFilterChange = ({selectedGenres, selectedCountries, selectedYears}) => {
        setYearFilter(selectedYears)
        setGenreFilter(selectedGenres)
        setCountryFilter(selectedCountries)
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
            <Navigation onFilterChange={onFilterChange} />
            <Box className="divider"></Box>
            <Grid container spacing={2} sx={{ rowGap: '50px' }}>
                {movies.filter(filteredMovie).map(movie => (
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
            <ScrollTop />
        </Container>
    );
};

export default Movies;