import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './AdminPanel.css';
import {DataGrid} from '@mui/x-data-grid';
import {Button, Container} from '@mui/material';
import AdminNavbar from "./AdminNavbar";

export default function MovieManagement() {
    const [ movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    function fetchMovies() {
        axios.get('http://localhost:8080/api/film/all')
            .then(response => {
                console.log(response.data)
                setMovies(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.1},
        {field: 'title', headerName: 'Название', flex: 0.4},
        {field: 'genre', headerName: 'Жанр', flex: 0.2},
        {field: 'rating', headerName: 'Рейтинг', flex: 0.2},
        {
            field: 'actions',
            headerName: 'Действия',
            flex: 0.3,
            renderCell: (params) => (
                <div>
                    <Button variant="contained" color="primary" size="small">Редагувати</Button>
                    <Button variant="contained" color="secondary" size="small">Видалити</Button>
                </div>
            )
        },
    ];

    return (
        <Container maxWidth={"lg"}>
            <div className={"admin-panel"}>
                <h1>Управління фільмами</h1>
                <nav>
                    <AdminNavbar active={1}></AdminNavbar>
                </nav>

                <div className="movie-management">


                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid rows={movies} columns={columns}  pageSize={5}/>
                    </div>
                </div>
            </div>
        </Container>
    );
}
