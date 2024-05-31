import {Container} from "@mui/material";

import './Registration.css'
import {Link} from "react-router-dom";
import apple from "../login/images/apple.svg";
import google from "../login/images/google.svg";
import facebook from "../login/images/facebook.svg";
import React, {useState} from "react";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    return (
        <Container maxWidth="lg" className="registration">
            <h1 className="title">ЗАРЕЄСТРУВАТИСЬ</h1>

            <div className="form-container">
                <form onSubmit={()=>{}}>
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