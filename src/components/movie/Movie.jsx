import { Card, CardMedia, Grid } from '@mui/material';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./Movie.css"
import axios from "axios";

const Movie = ({ movie }) => {
    const [poster, setPoster] = useState("")

    function getPoster(){
        axios.get(`http://localhost:8080/api/file/film/${movie.id}/poster`)
            .then(resp => {
                console.log(resp)
                setPoster(resp.data)
            })
    }

    const isTv = movie.title ? 'movies' : 'tv';
    return (
        <Grid item key={movie.id} xs={6} sm={6} md={3} lg={2}>
            <Link to={`/${isTv}/${movie.id}`}>
                <Card style={{
                    backgroundColor: "transparent",
                    margin: "auto",
                    boxShadow: "none"
                }}>
                    {poster ? (<CardMedia
                        component="img"
                        height="300"
                        image={movie.poster_path}
                        alt={movie.title}
                        className="poster"
                    />):(
                        <CardMedia
                            component="img"
                            height="300"
                            image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                            alt={movie.title}
                            className="poster"
                        />
                    )}


                    <div className="movie-title">
                        {movie.title ? movie.title : movie.name}
                    </div>
                </Card>
            </Link>
        </Grid>
    );
}

export default Movie;
