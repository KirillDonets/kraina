import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, CircularProgress, Grid, Card, CardMedia, Typography, Box, IconButton, Pagination } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import api, { apiKey, token, baseUrl } from '../../app/http';
import Movie from '../../components/movie/Movie';
import ScrollTop from '../../components/scrollTop/scrollTop';
/*
const params = new URLSearchParams(location.search);
      const query = params.get('query');
      */
const MOVIES_PER_PAGE = 30;

const SearchResults = () => {
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

        const params = new URLSearchParams(location.search);
        const query = params.get('query');
        const response = await api.get('film/all');
        const searchPattern = new RegExp(query, "gi")
        const filteredMovies = response.data.filter(movie => searchPattern.test(movie.title))
        
        console.log(filteredMovies);
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
    return movies.filter(filteredMovie).slice(startIndex, location.pathname === '/homePage' ? 6 : endIndex);

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
      <h1 className='textwhite'>Результати пошуку</h1>

      <Box className="divider"></Box>
      <Grid container spacing={2} sx={{ rowGap: '50px' }}>
        {getCurrentPageMovies().map(movie => (
          <Movie movie={movie} key={movie.id} />
        ))}
      </Grid>
      {location.pathname !== '/homePage' && <Pagination
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
};

export default SearchResults;
