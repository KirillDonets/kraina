import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, CircularProgress, Typography, Card, CardMedia, Grid, Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Filmography.css';
import {apiKey, token, baseUrl} from '../../app/http';

const Filmography = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const response = await fetch(`${baseUrl}/person/${id}?api_key=${apiKey}&language=uk-UA&append_to_response=movie_credits`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const data = await response.json();

                setPerson(data);
                setMovies(data.movie_credits);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке данных о человеке:', error);
                setLoading(false);
            }
        };

        fetchPersonDetails();
    }, [id]);

    if (loading) {
        return (
            <Container maxWidth="lg">
                <CircularProgress />
            </Container>
        );
    }
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <Container maxWidth="lg">
            {person && (
                <Box display="flex" alignItems="center" mb={2}>
                    {person.profile_path && (
                        <CardMedia
                            className='personImg'
                            image={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                            title={person.name}
                        />
                    )}
                    <Box ml={2} color='#FFFFFF'>
                        <Typography variant="h4">{person.name}</Typography>
                    </Box>
                </Box>
            )}
            <Box className="divider"></Box>
            {movies && (
                <Box>
                    <Typography variant="h5" color='#FFFFFF' gutterBottom>Фільмографія:</Typography>
                    
                   <Grid container spacing={2}>
                        {movies.cast.map(movie => (
                            <Grid item key={movie.id} xs={6} sm={6} md={3} lg={2}>
                                <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                                    <Card style={{
                                            backgroundColor: "transparent",
                                            margin: "auto",
                                            boxShadow: "none"
                                        }}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                                            alt={movie.title}
                                            className="poster"
                                        />
                                         <div className="movie-title">
                                            {movie.title ? movie.title : movie.name}
                                        </div>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                    <Box className="divider"></Box>
                    <IconButton
                color="primary"
                onClick={scrollToTop}
                style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#FFFFFF' }}
            >
            <ArrowUpwardIcon />
            </IconButton>
                </Box>
            )}
        </Container>
    );
}

export default Filmography;
