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
        actors: [],
        dislikeVote: '',
        film_video_path: null,
        likeVote: '',
        poster_path: null,
        releaseDate: '',
        trailer_path: null
    });
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [actors, setSelectedActors] = useState([]);
    const [directors, setSelectedDirectors] = useState([]);
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
    const handleActorsChange = (event) => {
        const {target: {value}} = event;
        setNewMovie({...newMovie, actors: value});
    };
    const handleDirectorsChange = (event) => {
        const {target: {value}} = event;
        setNewMovie({...newMovie, actors: value});
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
                    actors: [],
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
    

    return (
        <Container maxWidth={"lg"}>
            <div className={"admin-panel"}>
                <h1>Додавання фільмів</h1>
                <nav>
                    <AdminNavbar active={2}/>
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
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '5px',
                                      '& fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки по умолчанию
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при наведении
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при фокусе
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#FFC700', // Цвет текста по умолчанию
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#FFC700', // Цвет текста при фокусе
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                      color: '#FFC700', // Цвет текста при уменьшении (поднятии)
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#FFC700', // Цвет текста внутри поля
                                    },
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth sx={{border: '1px solid #FFC700', borderRadius: '5px'}}>
                                <InputLabel  id="genre-label" sx={{
                                        color: '#FFC700',
                                        '&.Mui-focused': {
                                            color: '#FFC700'
                                        },
                                        '&.MuiInputLabel-shrink': {
                                            color: '#FFC700'
                                    }
                                    }} >Жанри</InputLabel>
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
                                    {/* {genres.map((genre) => (
                                        <MenuItem key={genre.id} value={genre}>
                                            <Checkbox checked={newMovie.genres.indexOf(genre) > -1} sx={{ color: '#FFC700' }}/>
                                            <ListItemText primary={genre.name}/>
                                        </MenuItem>
                                    ))} */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth  sx={{border: '1px solid #FFC700', borderRadius: '5px'}}>
                                <InputLabel id="genre-label" sx={{
                                        color: '#FFC700',
                                        '&.Mui-focused': {
                                            color: '#FFC700'
                                        },
                                        '&.MuiInputLabel-shrink': {
                                            color: '#FFC700'
                                    }
                                    }}>Актори</InputLabel>
                                <Select
                                    labelId="genre-label"
                                    id="actors"
                                    multiple
                                    value={newMovie.actors}
                                    onChange={handleActorsChange}
                                    input={<OutlinedInput label="Актори"/>}
                                    renderValue={(selected) => selected.map(g => g.name).join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {/* {actors.map((actor) => (
                                        <MenuItem key={actor.id} value={actor}>
                                            <Checkbox checked={newMovie.actors.indexOf(actor) > -1} sx={{ color: '#FFC700'}}/>
                                            <ListItemText primary={actor.name}/>
                                        </MenuItem>
                                    ))} */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth  sx={{border: '1px solid #FFC700', borderRadius: '5px'}}>
                                <InputLabel id="genre-label" sx={{
                                        color: '#FFC700',
                                        '&.Mui-focused': {
                                            color: '#FFC700'
                                        },
                                        '&.MuiInputLabel-shrink': {
                                            color: '#FFC700'
                                    }
                                    }}>Режисери</InputLabel>
                                <Select
                                    labelId="genre-label"
                                    id="directors"
                                    multiple
                                    value={newMovie.directors}
                                    onChange={handleDirectorsChange}
                                    input={<OutlinedInput label="Режисери"/>}
                                    renderValue={(selected) => selected.map(g => g.name).join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {actors.map((director) => (
                                        <MenuItem key={director.id} value={director}>
                                            <Checkbox checked={newMovie.directors.indexOf(director) > -1} sx={{ color: '#FFC700'}}/>
                                            <ListItemText primary={director.name}/>
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
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '5px',
                                      '& fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки по умолчанию
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при наведении
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при фокусе
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#FFC700', // Цвет текста по умолчанию
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#FFC700', // Цвет текста при фокусе
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                      color: '#FFC700', // Цвет текста при уменьшении (поднятии)
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#FFC700', // Цвет текста внутри поля
                                    },
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="originalTitle"
                                label="Оригінальна назва"
                                value={newMovie.originalTitle}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '5px',
                                      '& fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки по умолчанию
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при наведении
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при фокусе
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#FFC700', // Цвет текста по умолчанию
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#FFC700', // Цвет текста при фокусе
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                      color: '#FFC700', // Цвет текста при уменьшении (поднятии)
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#FFC700', // Цвет текста внутри поля
                                    },
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="runtime"
                                label="Тривалість"
                                value={newMovie.runtime}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '5px',
                                      '& fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки по умолчанию
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при наведении
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при фокусе
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#FFC700', // Цвет текста по умолчанию
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#FFC700', // Цвет текста при фокусе
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                      color: '#FFC700', // Цвет текста при уменьшении (поднятии)
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#FFC700', // Цвет текста внутри поля
                                    },
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="voteAverage"
                                label="Середній голос"
                                value={newMovie.voteAverage}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '5px',
                                      '& fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки по умолчанию
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при наведении
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при фокусе
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#FFC700', // Цвет текста по умолчанию
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#FFC700', // Цвет текста при фокусе
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                      color: '#FFC700', // Цвет текста при уменьшении (поднятии)
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#FFC700', // Цвет текста внутри поля
                                    },
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="dislikeVote"
                                label="Голоси проти"
                                value={newMovie.dislikeVote}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '5px',
                                      '& fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки по умолчанию
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при наведении
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при фокусе
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#FFC700', // Цвет текста по умолчанию
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#FFC700', // Цвет текста при фокусе
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                      color: '#FFC700', // Цвет текста при уменьшении (поднятии)
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#FFC700', // Цвет текста внутри поля
                                    },
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="likeVote"
                                label="Голоси за"
                                value={newMovie.likeVote}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '5px',
                                      '& fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки по умолчанию
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при наведении
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при фокусе
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#FFC700', // Цвет текста по умолчанию
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#FFC700', // Цвет текста при фокусе
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                      color: '#FFC700', // Цвет текста при уменьшении (поднятии)
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#FFC700', // Цвет текста внутри поля
                                    },
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="releaseDate"
                                label="Дата виходу"
                                value={newMovie.releaseDate}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '5px',
                                      '& fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки по умолчанию
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при наведении
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при фокусе
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#FFC700', // Цвет текста по умолчанию
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#FFC700', // Цвет текста при фокусе
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                      color: '#FFC700', // Цвет текста при уменьшении (поднятии)
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#FFC700', // Цвет текста внутри поля
                                    },
                                  }}
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
