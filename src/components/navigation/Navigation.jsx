import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const years = [];
for(let i = 1960; i< new Date().getFullYear()+1; i++){
  years.push(i)
}


const Navigation = ({ onFilterChange }) => {
  const [yearsForm, setYearsForm] = React.useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

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
        const response = await fetch(`${baseUrl}/configuration/languages?api_key=${apiKey}&language=uk-UA`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        });
        const data = await response.json();
console.log(data);
        setCountries(data || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchGenres();
    fetchCountries();
  }, []);
  useEffect(()=>{
    fetchMovies();

  }, [yearsForm, selectedGenres, selectedCountries])

  const [localFilter, setLocalFilter] = React.useState({
    selectedGenres: [],
    selectedCountries: [],
    sortedBy: 'popularity.desc',
    yearFrom: '',
    yearTo: ''
  });
  const handleChangeYear = (event) => {
    const {target: { value }} = event;
    setYearsForm(value);

  };
  const handleChangeGenre= (event) => {
    const {target: { value }} = event;
    setSelectedGenres(value);
  };
  const handleChangeCountry= (event) => {
    const {target: { value }} = event;
    setSelectedCountries(value)
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const handleClearFilters = ()=>{
    setSelectedGenres([])
    setSelectedCountries([])
    setYearsForm([])
  }

  const fetchMovies = async () => {
    try {
      console.log(yearsForm);
      // setLoading(true);
      const genreParams = selectedGenres.map(g=>g.id).join(',');
      const countryParams = selectedCountries.map(c=>c.iso_639_1).join(',');
      const yearParams = yearsForm ? `&primary_release_year=${yearsForm.join(',')}` : '';
      const sortedBy='popularity.desc'
      const response = await fetch(
        `${baseUrl}/discover/movie?api_key=${apiKey}&language=uk-UA&sort_by=${sortedBy}&with_genres=${genreParams}&with_original_language=${countryParams}${yearParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        }
      );
      const data = await response.json();
      onFilterChange(data.results || []);
      //setLoading(false);
      console.log(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      //setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
     
     <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Year</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={yearsForm}
          onChange={handleChangeYear}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              <Checkbox checked={yearsForm.indexOf(year) > -1} />
              <ListItemText primary={year} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Жанри</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedGenres}
          onChange={handleChangeGenre}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) =>selected.map(g=>g.name).join(', ')}
          MenuProps={MenuProps}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre}>
              <Checkbox checked={selectedGenres.some(g=>g.id==genre.id)}  />
              <ListItemText primary={genre.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Країни</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCountries}
          onChange={handleChangeCountry}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) =>selected.map(g=>g.english_name).join(', ')}
          MenuProps={MenuProps}
        >
          {countries.map((country) => (
            <MenuItem key={country.iso_639_1} value={country}>
              <Checkbox checked={selectedCountries.some(g=>g.iso_639_1==country.iso_639_1)}  />
              <ListItemText primary={country.english_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>







      <Select
        name="sortedBy"
        value={localFilter.sortedBy}
        onChange={handleChange}
        variant="outlined"
        size="small"
      >
        <MenuItem value="popularity.desc">Popularity</MenuItem>
        <MenuItem value="release_date.desc">Release Date</MenuItem>
        <MenuItem value="vote_average.desc">Vote Average</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleClearFilters}>
        Очистити
      </Button>
      
    </Box>
  );
};

export default Navigation;
