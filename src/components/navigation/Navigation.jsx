import React from 'react';
import { Box, Button, TextField, Select, MenuItem } from '@mui/material';

const Navigation = ({ onFilterChange }) => {
  const [localFilter, setLocalFilter] = React.useState({
    selectedGenres: [],
    selectedCountries: [],
    sortedBy: 'popularity.desc',
    yearFrom: '',
    yearTo: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilter);
  };

  return (
    <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <TextField
        label="From Year"
        name="yearFrom"
        type="number"
        value={localFilter.yearFrom}
        onChange={handleChange}
        variant="outlined"
        size="small"
      />
      <TextField
        label="To Year"
        name="yearTo"
        type="number"
        value={localFilter.yearTo}
        onChange={handleChange}
        variant="outlined"
        size="small"
      />
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
      <Button variant="contained" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Navigation;
