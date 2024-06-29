import React, { useState, useEffect } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, TextField, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Navigation.css';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const Navigation = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [sortedBy, setSortedBy] = useState('popularity.desc');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=uk-UA`, {
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

    const fetchCountries = async () => {
      try {
        const response = await fetch(`${baseUrl}/configuration/countries?api_key=${apiKey}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        });
        const data = await response.json();
        setCountries(data || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchGenres();
    fetchCountries();
  }, []);

  const handleGenreSelect = (event) => {
    setSelectedGenres(event.target.value);
  };

  const handleCountrySelect = (event) => {
    setSelectedCountries(event.target.value);
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

  const handleResetFilters = () => {
    setSelectedGenres([]);
    setSelectedCountries([]);
    setSortedBy('popularity.desc');
    setYearFrom('');
    setYearTo('');
    onFilterChange({
      selectedGenres: [],
      selectedCountries: [],
      sortedBy: 'popularity.desc',
      yearFrom: '',
      yearTo: ''
    });
  };

  useEffect(() => {
    onFilterChange({
      selectedGenres,
      selectedCountries,
      sortedBy,
      yearFrom,
      yearTo
    });
  }, [selectedGenres, selectedCountries, sortedBy, yearFrom, yearTo, onFilterChange]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
  return (
    <Box className="navigationContainer" sx={{ marginTop: '20px' }}>
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
              <Checkbox checked={selectedGenres.indexOf(genre.id) > -1} />
              <ListItemText primary={genre.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="formControl">
        <InputLabel id="country-label">Країна</InputLabel>
        <Select
          labelId="country-label"
          multiple
          value={selectedCountries}
          onChange={handleCountrySelect}
          renderValue={(selected) => selected.map(code => countries.find(country => country.iso_3166_1 === code)?.english_name).join(', ')}
          className="MuiSelect-root"
        >
          {countries.map((country) => (
            <MenuItem key={country.iso_3166_1} value={country.iso_3166_1}>
              <Checkbox checked={selectedCountries.indexOf(country.iso_3166_1) > -1} />
              <ListItemText primary={country.english_name} />
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
      <Button variant="contained" onClick={handleResetFilters} sx={{ borderRadius: '15px', backgroundColor: '#D9D9D9', marginTop: '10px' }}>
        Скинути всі фільтри
      </Button>
    </Box>
  );
};

export default Navigation;
