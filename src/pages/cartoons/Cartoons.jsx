import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Grid, Pagination, Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Cartoons.css';
import Movie from '../../components/movie/Movie';
import {apiKey, token, baseUrl} from '../../app/http';
import Navigation from '../../components/navigation/Navigation';

const Cartoons = () => {
    const [cartoons, setCartoons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const fetchCartoons = async () => {
            try {
                const response = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&language=uk-UA&page=${page}&with_genres=16`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const data = await response.json();
                console.log(data);

                // Обновление состояния с данными мультфильмов
                setCartoons(data.results);
                setTotalPages(data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cartoons:', error);
                setLoading(false);
            }
        };

        fetchCartoons();
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
    const onFilterChange = (dataFilter)=>{
        console.log(dataFilter);
    }
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <Container maxWidth="lg">
            <h1 className='textwhite'>Мультфільми</h1>
            <Navigation onFilterChange={onFilterChange}/>
            <Box className="divider"></Box>
            <Grid container spacing={2} sx={{ rowGap: '50px' }}>
                {cartoons.map(cartoon => (
                    <Movie movie={cartoon} key={cartoon.id} />
                ))}
            </Grid>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '40px', marginLeft:"auto" }}
            />
            <Box className="divider"></Box>
            <IconButton
                color="primary"
                onClick={scrollToTop}
                style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#FFFFFF' }}
            >
            <ArrowUpwardIcon />
            </IconButton>
        </Container>
    );
}

export default Cartoons;
