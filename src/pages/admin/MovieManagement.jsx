import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './AdminPanel.css';
import {DataGrid} from '@mui/x-data-grid';
import {Button, Container} from '@mui/material';
import AdminNavbar from "./AdminNavbar";

const tokenAuth = localStorage.getItem('Auth');

function getUser() {
    axios.get("http://localhost:8080/api/user/getUserRoles", {
        headers: {'Authorization': `Basic ${tokenAuth}`}
    })
        .then(res => {
            if (res.request.responseURL === 'http://localhost:8080/api/user/getUserRoles' && res.data.roleName === 'ROLE_ADMIN') {
                console.log(res.data)
            }
            else {
                window.location.replace('http://localhost:3000/registration')
            }


        })
}
export default function MovieManagement() {
    const [ movies, setMovies] = useState([]);

    useEffect(() => {
        getUser()
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

    function deleteFilmById(id) {
        axios.post(`http://localhost:8080/api/film/delete/${id}`, {}, {
            headers: {'Authorization': `Basic ${tokenAuth}`}
        })
            .then(response => {
                console.log('Film deleted successfully:', response.data);
                fetchMovies();
            })
            .catch(error => {
                console.error('Error deleting film:', error);
            });
    }

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.1},
        {field: 'title', headerName: 'Название', flex: 0.4},
        {field: 'genres', headerName: 'Жанр', flex: 0.2},
        {field: 'likeVote', headerName: 'Рейтинг', flex: 0.2},
        {
            field: 'actions',
            headerName: 'Действия',
            flex: 0.3,
            renderCell: (params) => (
                <div>
                    <Button variant="contained" color="primary" size="small" style={{marginRight:"10px"}}>Edit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={() => deleteFilmById(params.row.id)}>Delete</Button>
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
