import {Container} from '@mui/material';
import React from 'react';
import {Link} from "react-router-dom";

import './Registration.css'

import apple from './images/apple.svg'
import facebook from './images/facebook.svg'
import google from './images/google.svg'

const Registration = () => {
    return (
        <Container maxWidth="lg" className="registration">
            <h1 className="title"><span className="highlight">УВІЙТИ</span> АБО ЗАРЕЄСТРУВАТИСЬ</h1>

            <div className="form-container">
                <form>
                    <div className="inputs">
                        <input placeholder={"Адреса електронної пошти або номер телефону"} type="text"/>
                        <input placeholder={"Пароль"} type="text"/>
                    </div>

                    <div className="actions">
                        <Link to={"#"} type={"submit"} className="login_button">Увійти</Link>
                        <p>або</p>
                        <Link to={"#"} className="signin_button">Зареєструватись</Link>
                        <Link to={"#"} className="forgot_password">Забули пароль?</Link>
                    </div>

                    <div className="checkbox_container">
                        <input id="remember_me" type="checkbox"/>
                        <label htmlFor="remember_me">Запам’ятати мене</label>
                    </div>

                    <div className="social_container">
                        <div className="social_list">
                            <ul>
                                <li><a href="#"><img src={apple} alt="apple"/></a></li>
                                <li><a href="#"><img src={google} alt="google"/></a></li>
                                <li><a href="#"><img src={facebook} alt="facebook"/></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="all_answers">
                        <Link to={"#"}>Всі питання</Link>
                    </div>
                </form>
            </div>
        </Container>
    );
}

export default Registration;
