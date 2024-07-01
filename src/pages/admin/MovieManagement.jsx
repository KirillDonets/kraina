import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function MovieManagement() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    function fetchMovies() {
        axios.get('/api/admin/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Название', width: 150 },
        { field: 'genre', headerName: 'Жанр', width: 130 },
        { field: 'rating', headerName: 'Рейтинг', width: 130 },
        {
            field: 'actions',
            headerName: 'Действия',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button variant="contained" color="primary" size="small">Edit</Button>
                    <Button variant="contained" color="secondary" size="small">Delete</Button>
                </div>
            )
        },
    ];

    return (
        <div className="movie-management">
            <h2>Управление Фильмами</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={movies} columns={columns} pageSize={5} />
            </div>
        </div>
    );
}
