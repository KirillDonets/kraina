import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './AdminPanel.css';
import {DataGrid} from '@mui/x-data-grid';
import {Button, Container} from '@mui/material';
import AdminNavbar from "./AdminNavbar";

const tokenAuth = localStorage.getItem('Auth');

function getUser() {
    axios.get("https://0099-217-199-237-96.ngrok-free.app/api/user/getUserRoles", {
        headers: {'Authorization': `Basic ${tokenAuth}`}
    })
        .then(res => {
            if (res.request.responseURL === 'https://0099-217-199-237-96.ngrok-free.app/api/user/getUserRoles' && res.data.roleName === 'ROLE_ADMIN') {
                console.log(res.data)
            }
            else {
                window.location.replace('http://localhost:3000/registration')
            }


        })
}
export default function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
        getUser()
    }, []);

    function fetchUsers() {
        axios.get('https://0099-217-199-237-96.ngrok-free.app/api/user/all', {
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
