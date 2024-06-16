import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from '@mui/material';
import './Navigation.css';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const Navigation = () => {
  const [categories, setCategories] = useState([
    { id: 'movie', name: 'Фільм' },
    { id: 'tv', name: 'Серіал' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('movie');
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortedBy, setSortedBy] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [director, setDirector] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${baseUrl}/genre/${selectedCategory}/list?api_key=${apiKey}&language=uk-UA`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        });
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const genreParams = selectedGenres.join(',');
        const yearParams = (yearFrom && yearTo) ? `&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-12-31` : '';
        const directorParams = director ? `&with_crew=${director}` : '';

        const response = await fetch(
          `${baseUrl}/discover/${selectedCategory}?api_key=${apiKey}&language=uk-UA&sort_by=${sortedBy}&with_genres=${genreParams}${yearParams}${directorParams}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json;charset=utf-8',
            },
          }
        );
        const data = await response.json();
        setMovies(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedCategory, selectedGenres, sortedBy, yearFrom, yearTo, director]);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleGenreSelect = (event) => {
    setSelectedGenres(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortedBy(event.target.value);
  };

  const handleYearFromChange = (event) => {
    setYearFrom(event.target.value);
  };

  const handleYearToChange = (event) => {
    setYearTo(event.target.value);
  };

  const handleDirectorChange = (event) => {
    setDirector(event.target.value);
  };

  return (
    <Container maxWidth="lg" className="navigationContainer">
      <Box className="filterSortBox">
        <FormControl className="formControl">
          <InputLabel id="category-label">Категорії</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={handleCategorySelect}
            className="MuiSelect-root"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="formControl">
          <InputLabel id="sort-by-label">Сортувати за</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortedBy}
            onChange={handleSortByChange}
            className="MuiSelect-root"
          >
            <MenuItem value="popularity.desc">По популярності</MenuItem>
            <MenuItem value="vote_average.desc">По рейтингу</MenuItem>
            <MenuItem value="release_date.desc">По року випуску</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="formControl">
          <InputLabel id="genre-label">Жанри</InputLabel>
          <Select
            labelId="genre-label"
            multiple
            value={selectedGenres}
            onChange={handleGenreSelect}
            renderValue={(selected) => selected.map(id => genres.find(genre => genre.id === id)?.name).join(', ')}
            className="MuiSelect-root"
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Від"
          type="number"
          value={yearFrom}
          onChange={handleYearFromChange}
          className="formControl yearInput"
        />
        <TextField
          label="До"
          type="number"
          value={yearTo}
          onChange={handleYearToChange}
          className="formControl yearInput"
        />
        <TextField
          label="Режисер"
          value={director}
          onChange={handleDirectorChange}
          className="formControl"
          inputProps={{
            style: { color: 'white' }
          }}
        />
      </Box>
      <Box className="resultsBox">
        <Typography variant="h5" className="resultsTitle">Результати:</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="500"
                    image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={movie.title}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Navigation;
