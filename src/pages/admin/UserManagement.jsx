import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './AdminPanel.css';
import {DataGrid} from '@mui/x-data-grid';
import {Button, Container} from '@mui/material';
import AdminNavbar from "./AdminNavbar";

const tokenAuth = localStorage.getItem('Auth');

export default function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    function fetchUsers() {
        axios.get('http://localhost:8080/api/user/all', {
            headers: {'Authorization': `Basic ${tokenAuth}`}
        })
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    const columns = [
        {field: 'userId', headerName: 'ID', flex: 0.2},
        {field: 'userName', headerName: 'Username', flex: 0.2},
        {field: 'email', headerName: 'Email', flex: 0.2},
        {field: 'role', headerName: 'Роль', flex: 0.2},
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
        <Container maxWidth={"lg"}>
            <div className="admin-panel">
                <h1>Управління користувачами</h1>
                <nav>
                    <AdminNavbar active={0}></AdminNavbar>
                </nav>
                <div className="user-management">
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={5}
                            getRowId={(row) => row.userId}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}
