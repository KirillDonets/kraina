import React from 'react';
import { Container } from '@mui/material';
import AdminNavbar from './AdminNavbar';
import UserManagement from './UserManagement';
import MovieManagement from './MovieManagement';
import './AdminPanel.css';

export default function AdminPanel() {
    return (
        <div className="admin-panel">
            <Container maxWidth="lg">
                <h1>Административная Панель</h1>
                <AdminNavbar />
                <div className="admin-content">
                    <UserManagement />
                    <MovieManagement />
                </div>
            </Container>
        </div>
    );
}
