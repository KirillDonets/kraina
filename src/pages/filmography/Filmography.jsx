import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, CircularProgress, Typography, Card, CardMedia, Grid, Box } from '@mui/material';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

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

    return (
        <Container maxWidth="lg">
            {person && (
                <Box display="flex" alignItems="center" mb={2}>
                    {person.profile_path && (
                        <CardMedia
                            component="img"
                            height="max"
                            width="150"
                            image={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                            title={person.name}
                            style={{ borderRadius: '8px' }}
                        />
                    )}
                    <Box ml={2}>
                        <Typography variant="h4">{person.name}</Typography>
                        <Typography variant="body1">{person.biography}</Typography>
                    </Box>
                </Box>
            )}
            {movies && (
                <Box>
                    <Typography variant="h5" gutterBottom>Фільмографія:</Typography>
                    <Grid container spacing={2}>
                        {movies.cast.map(movie => (
                            <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2}>
                                <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                                            alt={movie.title}
                                        />
                                        <Typography variant="body2" align="center"  color="black">{movie.title}</Typography>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
}

export default Filmography;
