import {Container} from "@mui/material";
import './Registration.css';
import {Link, useNavigate} from "react-router-dom";
import apple from "../login/images/apple.svg";
import google from "../login/images/google.svg";
import facebook from "../login/images/facebook.svg";
import React, {useState} from "react";
import axios from "axios";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

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

    const register = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        axios.post("http://localhost:8080/api/auth/registration", {
            username: username,
            password: password
        })
            .then(resp => {
                navigate("/login");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setServerError(error.response.data);
                } else {
                    setServerError("Виникла помилка. Будь ласка, спробуйте пізніше.");
                }
            });
    };

    return (
        <Container maxWidth="lg" className="registration">
            <h1 className="title">ЗАРЕЄСТРУВАТИСЬ</h1>

            <div className="form-container">
                <form onSubmit={register}>
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

                    {serverError && <div className="error">{serverError}</div>}

                    <div className="actions">
                        <button to="#" type="submit" className="login_button">Зареєструватись</button>
                        <Link to="/login" className="login_in_account">Увiйти в акаунт</Link>
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
