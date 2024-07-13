import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import { Container, TextField, Grid, Button, Snackbar, Alert } from '@mui/material';
import AdminNavbar from "./AdminNavbar";

const tokenAuth = localStorage.getItem('Auth'); // Auth token

export default function AddActorManagement() {
    const [actors, setActors] = useState([]);
    const [newActor, setNewActor] = useState({
        name: '',
        photo_path: null
    });
    const [photo, setPhoto] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchActors();
    }, []);

    const fetchActors = () => {
        axios.get('http://localhost:8080/api/actor/all')
            .then(response => {
                setActors(response.data);
            })
            .catch(error => {
                console.error('Error fetching actors:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewActor({ ...newActor, [name]: value });
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
        console.log(file)
    };

    const handleAddActor = () => {
        const formData = new FormData();
        formData.append('name', newActor.name);
        if (photo) {
            formData.append('photo', photo);
        }

        axios.post('http://localhost:8080/api/actor/create', formData, {
            headers: {
                'Authorization': `Basic ${tokenAuth}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSuccessMessage('Актор успішно додан!');
                fetchActors();
                setNewActor({ name: '', photo_path: null });
                setPhoto(null);

                let id = response.data;

                console.log(response.data)

                if (photo != null){
                    axios.post(`http://localhost:8080/api/file/actor/${id}/photo`, {file:photo}, {
                        headers:{
                            'Authorization': `Basic ${tokenAuth}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                }
            })
            .catch(error => {
                setErrorMessage(`Помилка при додаванні актора: ${error.response?.data?.message || error.message}`);
            });
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };  

    return (
        <Container maxWidth={"lg"}>
            <div className={"admin-panel"}>
                <h1>Додавання акторів</h1>
                <nav>
                    <AdminNavbar active={4} />
                </nav>

                <div className="actor-management">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Ім'я"
                                value={newActor.name}
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
                                onClick={handleAddActor}
                                fullWidth
                            >
                                Додати актора
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
