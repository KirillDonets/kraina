import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    function fetchUsers() {
        axios.get('/api/admin/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Имя', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'role', headerName: 'Роль', width: 130 },
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
        <div className="user-management">
            <h2>Управление Пользователями</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={users} columns={columns} pageSize={5} />
            </div>
        </div>
    );
}
