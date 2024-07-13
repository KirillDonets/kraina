import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import { Container, TextField, Grid, Button, Snackbar, Alert } from '@mui/material';
import AdminNavbar from "./AdminNavbar";

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

export default function AddDirectorManagement() {
    const [directors, setDirectors] = useState([]);
    const [newDirector, setNewDirector] = useState({
        name: '',
        photo_path: null
    });
    const [photo, setPhoto] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getUser()
        fetchDirectors();
    }, []);

    const fetchDirectors = () => {
        axios.get('http://localhost:8080/api/regisseur/all')
            .then(response => {
                setDirectors(response.data);
            })
            .catch(error => {
                console.error('Error fetching directors:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDirector({ ...newDirector, [name]: value });
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };

    const handleAddDirector = () => {
        const formData = new FormData();
        formData.append('name', newDirector.name);
        if (photo) {
            formData.append('photo', photo);
        }

        axios.post('http://localhost:8080/api/regisseur/create', formData, {
            headers: {
                'Authorization': `Basic ${tokenAuth}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSuccessMessage('Режисер успішно додано!');
                fetchDirectors();
                setNewDirector({ name: '', photo_path: null });
                setPhoto(null);

                let id = response.data;

                axios.post(`http://localhost:8080/api/file/regisseur/${id}/photo`, {file:photo}, {
                    headers:{
                        'Authorization': `Basic ${tokenAuth}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
            })
            .catch(error => {
                setErrorMessage(`Помилка при додаванні режисера: ${error.response?.data?.message || error.message}`);
            });
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };    

    return (
        <Container maxWidth={"lg"}>
            <div className={"admin-panel"}>
                <h1>Додавання режисерів</h1>
                <nav>
                    <AdminNavbar active={3} />
                </nav>

                <div className="director-management">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Ім'я"
                                value={newDirector.name}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '5px',
                                      '& fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки по умолчанию
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при наведении
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#FFC700', // Цвет рамки при фокусе
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#FFC700', // Цвет текста по умолчанию
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#FFC700', // Цвет текста при фокусе
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                      color: '#FFC700', // Цвет текста при уменьшении (поднятии)
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#FFC700', // Цвет текста внутри поля
                                    },
                                  }}
                                />
                              
                            
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                id="photo_path"
                                type="file"
                                name="photo_path"
                                onChange={handlePhotoChange}
                                hidden
                            />
                            <label htmlFor="photo_path">
                                <Button variant="contained" component="span" fullWidth>
                                    Завантажити фото
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddDirector}
                                fullWidth
                            >
                                Додати режисера
                            </Button>
                        </Grid>
                    </Grid>

                  
                </div>

                <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {successMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}
