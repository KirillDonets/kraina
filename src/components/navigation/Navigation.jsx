import React from 'react';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from '@mui/material';

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
  const [localFilter, setLocalFilter] = React.useState({
    selectedGenres: [],
    selectedCountries: [],
    sortedBy: 'popularity.desc',
    yearFrom: '',
    yearTo: ''
  });
  const handleChangeYear = (event) => {
    const {
      target: { value },
    } = event;
    setYearsForm(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
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
