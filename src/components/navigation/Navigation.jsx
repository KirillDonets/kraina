import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import api from '../../app/http';

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
for (let i = 1960; i < new Date().getFullYear() + 1; i++) {
  years.push(i)
}


const Navigation = ({ onFilterChange }) => {
  const [selectedYears, setSelectedYears] = React.useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    fetchGenres();
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [selectedYears, selectedGenres, selectedCountries])

  const fetchGenres = async () => {
    try {
      const response = await api.get('genre/all')
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await api.get('country/all')
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };


  const handleChangeYear = (event) => {
    const { target: { value } } = event;
    setSelectedYears(value);

  };
  const handleChangeGenre = (event) => {
    const { target: { value } } = event;
    setSelectedGenres(value);
  };
  const handleChangeCountry = (event) => {
    const { target: { value } } = event;
    setSelectedCountries(value)
  };


  const handleClearFilters = () => {
    setSelectedGenres([])
    setSelectedCountries([])
    setSelectedYears([])
  }

  const fetchMovies = async () => {
    onFilterChange({selectedGenres, selectedCountries, selectedYears})
  };

  return (
    <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>

      <FormControl sx={{ m: 1, width: 300, border: '1px solid #FFC700', borderRadius: '5px' }}>
        <InputLabel sx={{
          color: '#FFC700',
          '&.Mui-focused': {
            color: '#FFC700'
          },
          '&.MuiInputLabel-shrink': {
            color: '#FFC700'
          }
        }}
          id="demo-multiple-checkbox-label">Рік</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedYears}
          onChange={handleChangeYear}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{ borderColor: '#FFC700' }}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              <Checkbox checked={selectedYears.indexOf(year) > -1} sx={{ color: '#FFC700' }} />
              <ListItemText primary={year} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300, border: '1px solid #FFC700', borderRadius: '5px' }}>
        <InputLabel sx={{
          color: '#FFC700',
          '&.Mui-focused': {
            color: '#FFC700'
          },
          '&.MuiInputLabel-shrink': {
            color: '#FFC700'
          }
        }} id="demo-multiple-checkbox-label">Жанри</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedGenres}
          onChange={handleChangeGenre}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.map(g => g.name).join(', ')}
          MenuProps={MenuProps}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre}>
              <Checkbox checked={selectedGenres.some(g => g.id == genre.id)} sx={{ color: '#FFC700' }} />
              <ListItemText primary={genre.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300, border: '1px solid #FFC700', borderRadius: '5px' }}>
        <InputLabel sx={{
          color: '#FFC700',
          '&.Mui-focused': {
            color: '#FFC700'
          },
          '&.MuiInputLabel-shrink': {
            color: '#FFC700'
          }
        }} id="demo-multiple-checkbox-label">Країни</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCountries}
          onChange={handleChangeCountry}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.map(g => g.english_name).join(', ')}
          MenuProps={MenuProps}>
          {countries.map((country) => (
            <MenuItem key={country.iso_639_1} value={country}>
              <Checkbox checked={selectedCountries.some(g => g.iso_639_1 == country.iso_639_1)} sx={{ color: '#FFC700' }} />
              <ListItemText primary={country.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Button className='btnClear' variant="contained" onClick={handleClearFilters}>
          Очистити
        </Button>
      </FormControl>







      {/* <Select
        name="sortedBy"
        value={localFilter.sortedBy}
        onChange={handleChange}
        variant="outlined"
        size="small"
      >
        <MenuItem value="popularity.desc">Popularity</MenuItem>
        <MenuItem value="release_date.desc">Release Date</MenuItem>
        <MenuItem value="vote_average.desc">Vote Average</MenuItem>
      </Select> */}


    </Box>
  );
};

export default Navigation;
