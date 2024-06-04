import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Card, CardMedia, TextField, Button, Pagination} from '@mui/material';
import './Series.css';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const Series = () => {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await fetch(`${baseUrl}/tv/popular?api_key=${apiKey}&language=uk-UA&page=${page}&with_genres=${genre}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const data = await response.json();
                console.log(data);
                setSeries(data.results);
                setTotalPages(data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching series:', error);
                setLoading(false);
            }
        };

        fetchSeries();
    }, [page, genre]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleSearch = () => {
        setLoading(true);
        setPage(1);
        setGenre(genre);
    };

    if (loading) {
        return (
            <Container maxWidth="lg">
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <h1>Серіали</h1>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Жанр"
                    type="text"
                    value={genre}
                    onChange={handleGenreChange}
                    style={{ marginRight: '10px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Пошук
                </Button>
            </div>
            <Grid container spacing={4}>
                {series.map(tv => (
                    <Grid item key={tv.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="500"
                                image={tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                                alt={tv.title}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px' }}
            />
        </Container>
    );
}

export default Series;
