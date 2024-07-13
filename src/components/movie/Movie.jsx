import { Card, CardMedia, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Movie.css"
import { baseURL } from '../../app/http';
import axios from 'axios';

const Movie = ({ movie }) => {
    const [poster, setPoster] = useState()
    const tokenAuth = localStorage.getItem('Auth');

    function getPoster() {
        axios.get(`http://localhost:8080/api/file/film/${movie.id}/poster`, {
            headers: { 'Authorization': `Basic ${tokenAuth}`, 'Range': 'bytes=0-520' },
        })
            .then(response => {
                console.log(response.data);
                setPoster(response.data);
            })
    }

    // useEffect(() => { getPoster() }, [movie])

    return (
        <Grid item key={movie.id} xs={6} sm={6} md={3} lg={2}>
            <Link to={`/movies/${movie.id}`}>
                <Card style={{
                    backgroundColor: "transparent",
                    margin: "auto",
                    boxShadow: "none"
                }}>
                    {poster}
                    <CardMedia
                        component="img"
                        height="300"
                        image={movie.poster_Path ? `${baseURL}/${movie.posterPath}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                        alt={movie.title}
                        className="poster"
                    />
                    <div className="movie-title">
                        {movie.title}
                    </div>
                </Card>
            </Link>
        </Grid>
    );
}

export default Movie;
