import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import {apiKey, token, baseUrl} from '../../app/http';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Snackbar, Alert } from '@mui/material';
import AdminNavbar from "./AdminNavbar";

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

export default function AddMovieManagement() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: [],
    rating: '',
    description: '',
    adult: false,
    original_title: '',
    runtime: '',
    vote_average: '',
    dislike_vote: '',
    film_video_path: null,
    like_vote: '',
    poster_path: null,
    release_date: '',
    trailer_path: null
  });
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchMovies();
    fetchGenres();
    fetchCountries();
  }, []);

  const fetchMovies = () => {
    axios.get('http://localhost:8080/api/film/all')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=uk-UA`);
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}&language=uk-UA`);
      const data = await response.json();
      setCountries(data || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setNewMovie({ ...newMovie, [name]: files[0] });
  };

  const handleGenreChange = (event) => {
    const { target: { value } } = event;
    setNewMovie({ ...newMovie, genre: value });
  };

  const handleAddMovie = () => {
    const formData = new FormData();
    Object.keys(newMovie).forEach(key => {
      formData.append(key, newMovie[key]);
    });

    axios.post('http://localhost:8080/api/film/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setSuccessMessage('Фільм успішно додано!');
        fetchMovies();
        setNewMovie({
          title: '',
          genre: [],
          rating: '',
          description: '',
          adult: false,
          original_title: '',
          runtime: '',
          vote_average: '',
          dislike_vote: '',
          film_video_path: null,
          like_vote: '',
          poster_path: null,
          release_date: '',
          trailer_path: null
        });
      })
      .catch(error => {
        setErrorMessage(`Помилка при додаванні фільму: ${error.response?.data?.message || error.message}`);
      });
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'title', headerName: 'Назва', flex: 0.4 },
    { field: 'genre', headerName: 'Жанр', flex: 0.2 },
    { field: 'rating', headerName: 'Рейтинг', flex: 0.2 },
    {
      field: 'actions',
      headerName: 'Дії',
      flex: 0.3,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="primary" size="small">Редагувати</Button>
          <Button variant="contained" color="secondary" size="small">Видалити</Button>
        </div>
      )
    },
  ];

  return (
    <Container maxWidth={"lg"}>
      <div className={"admin-panel"}>
        <h1>Додавання фільмів</h1>
        <nav>
          <AdminNavbar active={3} />
        </nav>

        <div className="movie-management">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Назва"
                value={newMovie.title}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="genre-label">Жанри</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre"
                  multiple
                  value={newMovie.genre}
                  onChange={handleGenreChange}
                  input={<OutlinedInput label="Жанри" />}
                  renderValue={(selected) => selected.map(g => g.name).join(', ')}
                  MenuProps={MenuProps}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre}>
                      <Checkbox checked={newMovie.genre.indexOf(genre) > -1} />
                      <ListItemText primary={genre.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="rating"
                label="Рейтинг"
                value={newMovie.rating}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Опис"
                value={newMovie.description}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="original_title"
                label="Оригінальна назва"
                value={newMovie.original_title}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="runtime"
                label="Тривалість"
                value={newMovie.runtime}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="vote_average"
                label="Середній голос"
                value={newMovie.vote_average}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="dislike_vote"
                label="Голоси проти"
                value={newMovie.dislike_vote}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="video/*"
                id="film_video_path"
                type="file"
                name="film_video_path"
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="film_video_path">
                <Button variant="contained" component="span" fullWidth>
                  Завантажити відео фільму
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="like_vote"
                label="Голоси за"
                value={newMovie.like_vote}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="poster_path"
                type="file"
                name="poster_path"
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="poster_path">
                <Button variant="contained" component="span" fullWidth>
                  Завантажити постер
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="release_date"
                label="Дата виходу"
                value={newMovie.release_date}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="video/*"
                id="trailer_path"
                type="file"
                name="trailer_path"
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="trailer_path">
                <Button variant="contained" component="span" fullWidth>
                  Завантажити трейлер
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMovie}
                fullWidth
              >
                Додати фільм
              </Button>
            </Grid>
          </Grid>

          <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
            <DataGrid rows={movies} columns={columns} pageSize={5} />
          </div>
        </div>

        <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}
