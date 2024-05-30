import { Container } from '@mui/material';
import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import './Registration.css'
import apple from './images/apple.svg'
import facebook from './images/facebook.svg'
import google from './images/google.svg'

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};

        if (!username) {
            errors.username = "Поле 'Адреса електронної пошти або номер телефону' обов'язкове.";
        }

        if (!password) {
            errors.password = "Поле 'Пароль' обов'язкове.";
        } else if (password.length < 6) {
            errors.password = "Пароль повинен містити мінімум 6 символів.";
        }

        return errors;
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        axios.post("http://localhost:8080/api/auth/login", {
            username: username,
            password: password,
        }).then(resp => {
            localStorage.setItem("token", resp.data);
            setAuthError('');  // Clear any previous authentication error
            navigate('/')
        }).catch(error => {
            if (error.response && error.response.status === 403) {
                setAuthError("Неправильний логін або пароль");
            } else {
                setAuthError("Виникла помилка. Будь ласка, спробуйте пізніше.");
            }
        });
    };

    return (
        <Container maxWidth="lg" className="registration">
            <h1 className="title"><span className="highlight">УВІЙТИ</span> АБО ЗАРЕЄСТРУВАТИСЬ</h1>

            <div className="form-container">
                <form onSubmit={loginSubmit}>
                    <div className="inputs">
                        <input
                            id="username"
                            placeholder="Адреса електронної пошти або номер телефону"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <div className="error">{errors.username}</div>}
                        <input
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>

                    {authError && <div className="error">{authError}</div>}

                    <div className="actions">
                        <button to="#" type="submit" className="login_button">Увійти</button>
                        <p>або</p>
                        <Link to="#" className="signin_button">Зареєструватись</Link>
                        <Link to="#" className="forgot_password">Забули пароль?</Link>
                    </div>

                    <div className="checkbox_container">
                        <input id="remember_me" type="checkbox" />
                        <label htmlFor="remember_me">Запам’ятати мене</label>
                    </div>

                    <div className="social_container">
                        <div className="social_list">
                            <ul>
                                <li><a href="#"><img src={apple} alt="apple" /></a></li>
                                <li><a href="#"><img src={google} alt="google" /></a></li>
                                <li><a href="#"><img src={facebook} alt="facebook" /></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="all_answers">
                        <Link to="#">Всі питання</Link>
                    </div>
                </form>
            </div>
        </Container>
    );
}

export default Registration;
