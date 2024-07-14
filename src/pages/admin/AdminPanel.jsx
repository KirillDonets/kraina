import React, {useEffect} from 'react';
import { Container } from '@mui/material';
import AdminNavbar from './AdminNavbar.jsx';
import UserManagement from './UserManagement';
import MovieManagement from './MovieManagement';
import './AdminPanel.css';
import axios from "axios";

const tokenAuth = localStorage.getItem('Auth'); // Auth token

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

export default function AdminPanel() {

    useEffect(() => {
        getUser()
    }, []);
    return (
        <div className="admin-panel">
            <Container maxWidth="lg">
                <h1>Административная Панель</h1>
                <AdminNavbar />
                <div className="admin-content">

                </div>
            </Container>
        </div>
    );
}
