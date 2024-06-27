import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Card, CardMedia, TextField, Button, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import './Series.css';
import {apiKey, token, baseUrl} from '../../app/http';
import Movie from '../../components/movie/Movie';

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

                // Фильтрация сериалов, исключая мультсериалы
                const filteredSeries = data.results.filter(tv => !tv.genre_ids.includes(16));

                setSeries(filteredSeries);
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
            <Grid container spacing={4}>
                {series.map(tv => (
                    <Movie movie={tv} key={tv.id} />
                    
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
