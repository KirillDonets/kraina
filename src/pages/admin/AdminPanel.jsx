import React, {useEffect} from 'react';
import { Container } from '@mui/material';
import AdminNavbar from './AdminNavbar.jsx';
import UserManagement from './UserManagement';
import MovieManagement from './MovieManagement';
import './AdminPanel.css';
import axios from "axios";

const tokenAuth = localStorage.getItem('Auth'); // Auth token

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
