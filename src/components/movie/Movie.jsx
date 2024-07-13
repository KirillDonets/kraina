import { Card, CardMedia, Grid } from '@mui/material';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./Movie.css"
import { baseURL } from '../../app/http';

const Movie = ({ movie }) => {
    return (
        <Grid item key={movie.id} xs={6} sm={6} md={3} lg={2}>
            <Link to={`/movie/${movie.id}`}>
                <Card style={{
                    backgroundColor: "transparent",
                    margin: "auto",
                    boxShadow: "none"
                }}>
                   
                 <CardMedia
                            component="img"
                            height="300"
                            image={movie.poster_path ? `${baseURL}/uploads/posters/{movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
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
