import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './AdminPanel.css';
import {DataGrid} from '@mui/x-data-grid';
import {Button, Container, TextField, Grid} from '@mui/material';
import AdminNavbar from "./AdminNavbar";

export default function AddMovieManagement() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({
        title: '',
        genre: '',
        rating: '',
        description: '',
        adult: false,
        original_title: '',
        runtime: '',
        vote_average: '',
        dislike_vote: '',
        film_video_path: '',
        like_vote: '',
        poster_path: '',
        release_date: '',
        trailer_path: ''
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    function fetchMovies() {
        axios.get('http://localhost:8080/api/film/all')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }

    function handleInputChange(event) {
        const {name, value} = event.target;
        setNewMovie({...newMovie, [name]: value});
    }

    function handleAddMovie() {
        axios.post('http://localhost:8080/api/film/add', newMovie)
            .then(response => {
                fetchMovies(); // Refresh the list of movies after adding a new one
                setNewMovie({
                    title: '',
                    genre: '',
                    rating: '',
                    description: '',
                    adult: false,
                    original_title: '',
                    runtime: '',
                    vote_average: '',
                    dislike_vote: '',
                    film_video_path: '',
                    like_vote: '',
                    poster_path: '',
                    release_date: '',
                    trailer_path: ''
                });
            })
            .catch(error => {
                console.error('Error adding movie:', error);
            });
    }

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.1},
        {field: 'title', headerName: 'Название', flex: 0.4},
        {field: 'genre', headerName: 'Жанр', flex: 0.2},
        {field: 'rating', headerName: 'Рейтинг', flex: 0.2},
        {
            field: 'actions',
            headerName: 'Действия',
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
                                label="Название"
                                value={newMovie.title}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="genre"
                                label="Жанр"
                                value={newMovie.genre}
                                onChange={handleInputChange}
                                fullWidth
                            />
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
                                label="Описание"
                                value={newMovie.description}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="original_title"
                                label="Оригинальное Название"
                                value={newMovie.original_title}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="runtime"
                                label="Длительность"
                                value={newMovie.runtime}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="vote_average"
                                label="Средний голос"
                                value={newMovie.vote_average}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="dislike_vote"
                                label="Голоса против"
                                value={newMovie.dislike_vote}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="film_video_path"
                                label="Путь к видео"
                                value={newMovie.film_video_path}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="like_vote"
                                label="Голоса за"
                                value={newMovie.like_vote}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="poster_path"
                                label="Путь к постеру"
                                value={newMovie.poster_path}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="release_date"
                                label="Дата выпуска"
                                value={newMovie.release_date}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="trailer_path"
                                label="Путь к трейлеру"
                                value={newMovie.trailer_path}
                                onChange={handleInputChange}
                                fullWidth
                            />
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
            </div>
        </Container>
    );
}
