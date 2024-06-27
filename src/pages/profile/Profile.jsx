import React, {useState} from 'react'
import ProfileNavbar from "./ProfileNavbar";
import {Container} from "@mui/material";
import {Link} from "react-router-dom";

import avatar from './images/avatar.png'

import './ProfileGlobal.css'

export default function Profile() {
    const [tarif, setTarif] = useState("Тариф: 7 днів безкоштовно")
    const [balance, setBalance] = useState(0)
    const [parentControlStatus, setParentControlStatus] = useState(false)
    const [user, setUser] = useState(null)

    return (
        <div className="profile profile-settings">
            <Container maxWidth={"lg"}>
                <div>
                    <h1>Управління особистими даними</h1>
                </div>
                <ProfileNavbar active={0}></ProfileNavbar>

                <div className="profile-content">
                    <div className="user profile-card">
                        <h2>Особисті дані</h2>
                        <div className="info">
                            <div className="text">
                                <p>Любитель кіно</p>
                                <p>Реєстрація через GOOGLE</p>
                                <p>E-mail</p>
                            </div>
                            <div className="avatar">
                                <img src={avatar} alt=""/>
                            </div>
                        </div>

                        <div>
                            <form>
                                <div className="input_handler">
                                    <label htmlFor="id">ID користувача</label>
                                    <input type="text" name={"id"} id={"id"}/>
                                </div>

                                <div className="input_handler">
                                    <label htmlFor="id">ID користувача</label>
                                    <input type="text" name={"id"} id={"id"}/>
                                </div>

                                <div className="input_handler">
                                    <label htmlFor="id">ID користувача</label>
                                    <input type="text" name={"id"} id={"id"}/>
                                </div>

                                <div className="input_handler">
                                    <label htmlFor="id">ID користувача</label>
                                    <input type="text" name={"id"} id={"id"}/>
                                </div>

                                <div className="input_handler">
                                    <label htmlFor="id">ID користувача</label>
                                    <div className="birthhandler">
                                        <input type="text" name={"id"} id={"id"}/>
                                        <input type="text"/>
                                        <input type="text"/>
                                    </div>
                                </div>

                                <button onClick={() => {
                                }}>Зберегти змiни
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="user-tarif profile-card">
                        <h2>ТвІй тариф</h2>

                        <div className="tarif">
                            <div>
                                <p>{tarif}</p>
                                <p>активний до 24.04.2024</p>
                            </div>

                            <div>
                                активний
                            </div>
                        </div>

                        <div className="devices-available">
                            <h3>Вам доступно:</h3>
                            <p>Пристроiв: 6</p>
                        </div>

                        <div className="change-beforepay">
                            <Link to={"#"}>
                                <div className="button">
                                    Змінити передплату
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="your-balance profile-card">
                            <div>
                                <h2>ТвІй Баланс</h2>
                                <p>{balance} грн.</p>
                            </div>
                            <div>
                                <Link to={"#"}>
                                    <div className="button">
                                        Оплатити
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="parent-control profile-card">
                            <h2>Батьківський контроль 18+</h2>
                            <p>{(parentControlStatus ? ("Включен") : ("вимкнений")).toUpperCase()}</p>

                            <Link to={"#"} className="button__absolute">
                                <div className="button">
                                    Налаштувати
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="user-film-list">
                    <h2>мІЙ КіНОЗАЛ</h2>
                    {/*TODO*/}
                </div>
            </Container>
        </div>

    )
}
