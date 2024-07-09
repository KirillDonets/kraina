import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './AdminPanel.css';
import {apiKey, token, baseUrl} from '../../app/http';
import {DataGrid} from '@mui/x-data-grid';
import {
    Button,
    Container,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Snackbar,
    Alert
} from '@mui/material';
import AdminNavbar from "./AdminNavbar";

const tokenAuth = localStorage.getItem('Auth'); // Auth token

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
    const [Film, setFilm] = useState();
    const [trailer, setTrailer] = useState();
    const [poster, setPoster] = useState()
    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        adult: false,
        originalTitle: '',
        runtime: '',
        voteAverage: '',
        genres: [],
        dislikeVote: '',
        film_video_path: null,
        likeVote: '',
        poster_path: null,
        releaseDate: '',
        trailer_path: null
    });
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([])
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
        axios.get(`http://localhost:8080/api/genre/all`)
            .then(response => {
              console.log(response);
                setGenres(response.data || []);
            }).catch(error => {
            console.error('Error fetching genres:', error);
        })

    };

    const fetchCountries = async () => {
      axios.get(`http://localhost:8080/api/country/all`)
          .then(response => {
            setCountries(response.data || []);
            console.log(response)
          }).catch(error => {
        console.error('Error fetching genres:', error);
      })
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setNewMovie({...newMovie, [name]: value});
    };

    const handlePosterChange = (event) =>{
        const file = event.target.files[0];
        setPoster(file)
    }

    const handleFilmChange = (event) =>{
        const file = event.target.files[0];
        setFilm(file)
    }

    const handleTrailerChange = (event) =>{
        const file = event.target.files[0];
        setTrailer(file)
    }

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        console.log(files)
        if (name === 'film_video_path') {
            setFilm(files[0]);
        } else if (name === 'poster_path') {
            setPoster(files[0]);
        } else if (name === 'trailer_path') {
            setTrailer(files[0]);
        }
        console.log(`film ${Film}`)
        console.log(`poster ${poster}`)
        console.log(`trailer ${trailer}`)
    };

    const handleGenreChange = (event) => {
        const {target: {value}} = event;
        setNewMovie({...newMovie, genres: value});
    };

    const handleAddMovie = () => {
        const formData = new FormData();
        Object.keys(newMovie).forEach(key => {

            if (key === 'genres') {
                newMovie[key].forEach(genre => {
                    formData.append('genre', JSON.stringify(genre)); // Пример преобразования в строку JSON
                });
            } else {
                formData.append(key, newMovie[key]);
            }
            console.log(`${key}:`, newMovie[key]);
        });


        let filmId;
      console.log("filmId" + filmId);

        axios.post('http://localhost:8080/api/film/create', formData, {
            headers: {
                'Authorization': `Basic ${tokenAuth}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                filmId = response.data;

                setSuccessMessage('Фільм успішно додано!');
                fetchMovies();

                console.log(newMovie);
                setNewMovie({
                    title: '',
                    genres: [],
                    description: '',
                    adult: false,
                    originalTitle: '',
                    runtime: '',
                    voteAverage: '',
                    dislikeVote: '',
                    film_video_path: null,
                    likeVote: '',
                    poster_path: null,
                    releaseDate: '',
                    trailer_path: null
                });



                axios.post(`http://localhost:8080/api/file/film/${filmId}/film`, {
                    file: Film
                }, {
                    headers: {
                        'Authorization': `Basic ${tokenAuth}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })

                axios.post(`http://localhost:8080/api/file/film/${filmId}/trailer`, {
                    file: trailer
                }, {
                    headers: {
                        'Authorization': `Basic ${tokenAuth}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })

                axios.post(`http://localhost:8080/api/file/film/${filmId}/poster`, {
                    file: poster
                }, {
                    headers: {
                        'Authorization': `Basic ${tokenAuth}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })


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
        {field: 'id', headerName: 'ID', flex: 0.1},
        {field: 'title', headerName: 'Назва', flex: 0.4},
        {field: 'genres', headerName: 'Жанр', flex: 0.2},
        {field: 'rating', headerName: 'Рейтинг', flex: 0.2},
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
                    <AdminNavbar active={3}/>
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
                                    id="genres"
                                    multiple
                                    value={newMovie.genres}
                                    onChange={handleGenreChange}
                                    input={<OutlinedInput label="Жанри"/>}
                                    renderValue={(selected) => selected.map(g => g.name).join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {genres.map((genre) => (
                                        <MenuItem key={genre.id} value={genre}>
                                            <Checkbox checked={newMovie.genres.indexOf(genre) > -1}/>
                                            <ListItemText primary={genre.name}/>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                name="originalTitle"
                                label="Оригінальна назва"
                                value={newMovie.originalTitle}
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
                                name="voteAverage"
                                label="Середній голос"
                                value={newMovie.voteAverage}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="dislikeVote"
                                label="Голоси проти"
                                value={newMovie.dislikeVote}
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
                                onChange={handleFilmChange}
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
                                name="likeVote"
                                label="Голоси за"
                                value={newMovie.likeVote}
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
                                onChange={handlePosterChange}
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
                                name="releaseDate"
                                label="Дата виходу"
                                value={newMovie.releaseDate}
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
                                onChange={handleTrailerChange}
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

                    <div style={{height: 400, width: '100%', marginTop: '20px'}}>
                        <DataGrid rows={movies} columns={columns} pageSize={5}/>
                    </div>
                </div>

                <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                        {successMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '100%'}}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}
