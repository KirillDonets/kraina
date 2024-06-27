import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Card, CardMedia, TextField, Button, Pagination } from '@mui/material';
import './AnimatedSeries.css';
import Movie from '../../components/movie/Movie';
import {apiKey, token, baseUrl} from '../../app/http';


const AnimatedSeries = () => {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await fetch(`${baseUrl}/discover/tv?api_key=${apiKey}&language=uk-UA&page=${page}&with_genres=16`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const data = await response.json();
                console.log(data);

                // Обновление состояния с фильтрацией только мультсериалов
                setSeries(data.results);
                setTotalPages(data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching series:', error);
                setLoading(false);
            }
        };

        fetchSeries();
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
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
            <h1>Мультсеріали</h1>
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

export default AnimatedSeries;
