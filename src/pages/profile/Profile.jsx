import React, {useEffect, useState} from 'react'
import ProfileNavbar from "./ProfileNavbar";
import {Container} from "@mui/material";
import {Link} from "react-router-dom";
import avatar from './images/avatar.png'
import './ProfileGlobal.css'
import axios from "axios";
import Movie from "../../components/movie/Movie";
import {apiKey, baseUrl, token} from "../../app/http";


export default function Profile() {
    const [tarif, setTarif] = useState("Тариф: 7 днів безкоштовно")
    const [balance, setBalance] = useState(0)
    const [parentControlStatus, setParentControlStatus] = useState(false)
    const [user, setUser] = useState({})
    const tokenAuth = localStorage.getItem('Auth'); // Auth token
    const [errors, setErrors] = useState({})
    const [filmIdList, setFilmIdList] = useState([])
    const [filmList, setFilmList] = useState([])


    useEffect(() => {
        getUser()
    }, []);

    function getUserFilmList(filmIdList) {
        console.log(`filmIdList: ${filmIdList}`);

        const tempFilmListPromises = filmIdList.map(filmId => {
            console.log(`Fetching movie with ID: ${filmId}`);  // Логируем каждый filmId
            return axios.get(`http://localhost:8080/api/film/get/${filmId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(response => {
                let poster;
                axios.get(`http://localhost:8080/api/file/film/${filmId}/poster`)
                    .then(resp =>{
                        poster = resp.config.url;
                        response.data.poster = poster;
                        console.log("Фото" + poster)
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
                return(response.data)
            })
                .catch(error => {
                    console.error(`Error fetching movie with ID ${filmId}:`, error);
                    return null; // Возвращаем null, если произошла ошибка
                });
        });

        Promise.all(tempFilmListPromises)
            .then(results => {
                const validResults = results.filter(movie => movie !== null); // Фильтруем неудачные запросы
                console.log('Fetched Movies:', validResults); // Логируем полученные фильмы
                setFilmList(validResults);
            });
    }


    function getUser() {
        axios.get("http://localhost:8080/api/user/get", {
            headers: {'Authorization': `Basic ${tokenAuth}`}
        })
            .then(res => {
                if (res.request.responseURL === 'http://localhost:8080/api/user/get') {
                    console.log(res.data)
                    setUser(res.data)
                    setBalance(res.data.balance)
                    setParentControlStatus(res.data.isParentControlEnabled)
                    setFilmIdList(res.data.filmId);

                    getUserFilmList(res.data.filmId);
                }
                else {
                    window.location.replace('http://localhost:3000/registration')
                }


            })
    }

    function validateForm() {
        let formErrors = {};
        if (!user.name) formErrors.name = "Имя не должно быть пустым";
        if (!user.email) {
            formErrors.email = "Email не должен быть пустым";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            formErrors.email = "Email некорректен";
        }
        if (!user.phone) {
            formErrors.phone = "Номер телефона не должен быть пустым";
        } else if (!/^\+380\d{9}$/.test(user.phone)) {
            formErrors.phone = "Номер телефона должен быть в формате +380XXXXXXXXX";
        }
        if (!user.dateOfBirth || !user.monthOfBirth || !user.yearOfBirth) {
            formErrors.dateOfBirth = "Дата рождения не должна быть пустой";
        } else if (!isValidDate(user.dateOfBirth, user.monthOfBirth, user.yearOfBirth)) {
            formErrors.dateOfBirth = "Некорректная дата рождения";
        }
        return formErrors;
    }

    function isValidDate(day, month, year) {
        const currentYear = new Date().getFullYear();
        const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

        if (day < 1 || day > daysInMonth(month, year)) {
            return false;
        }
        if (month < 1 || month > 12) {
            return false;
        }
        if (year < 1900 || year > currentYear) {
            return false;
        }
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(user.userName)
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            axios.post("http://localhost:8080/api/user/update",
                user,
                {headers: {'Authorization': `Basic ${tokenAuth}`}})
                .then(res => {

                    console.log("User updated successfully");
                    setErrors({});
                }).catch(error => {
                console.error("There was an error updating the user!", error);
            });
        }
    }

    function changeParentControlStatus() {
        axios.post("http://localhost:8080/api/user/changeParentControlStatus", {}, {
            headers: {'Authorization': `Basic ${tokenAuth}`}
        })
            .then(res => {
                setParentControlStatus(!parentControlStatus);
            })
    }

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
                                <p>{user.userName}</p>
                                <p>Реєстрація через сайт</p>
                                {user.email ? (<p>{user.email}</p>) : (<p>E-mail не указано</p>)}
                            </div>
                            <div className="avatar">
                                <img src={avatar} alt=""/>
                            </div>
                        </div>

                        <div className="forms">
                            <form onSubmit={handleSubmit}>
                                <div className="input_handler">
                                    <label htmlFor="id">ID користувача</label>
                                    <input type="text" name={"id"} id={"id"} value={user.userId} disabled={true}/>
                                </div>

                                <div className="input_handler">
                                    <label htmlFor="name">Як до тебе звертатися?</label>
                                    <input
                                        type="text"
                                        name={"name"}
                                        id={"name"}
                                        value={user.name || ''}
                                        onChange={(e) => setUser({...user, name: e.target.value})}
                                        placeholder="Введіть Ваше ім'я"/>
                                    {errors.name && <span className="error">{errors.name}</span>}
                                </div>

                                <div className="input_handler">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        type="text"
                                        name={"email"}
                                        id={"email"}
                                        value={user.email || ''}
                                        onChange={(e) => setUser({...user, email: e.target.value})}
                                        placeholder="Введіть Ваш E-mail"/>
                                    {errors.email && <span className="error">{errors.email}</span>}
                                </div>

                                <div className="input_handler">
                                    <label htmlFor="phone">Номер телефону</label>
                                    <input
                                        type="text"
                                        name={"phone"}
                                        id={"phone"}
                                        value={user.phone || ''}
                                        onChange={(e) => setUser({...user, phone: e.target.value})}
                                        placeholder="Введіть Ваш номер телефону"/>
                                    {errors.phone && <span className="error">{errors.phone}</span>}
                                </div>

                                <div className="input_handler">
                                    <label htmlFor="dateOfBirth">Дата народження</label>
                                    <div className="birthhandler">
                                        <input
                                            type="number"
                                            name={"dateOfBirth"}
                                            id={"dateOfBirth"}
                                            value={user.dateOfBirth || ''}
                                            onChange={(e) => setUser({...user, dateOfBirth: e.target.value})}
                                            placeholder={"День"}/>
                                        <input
                                            type="number"
                                            name={"monthOfBirth"}
                                            id={"monthOfBirth"}
                                            value={user.monthOfBirth || ''}
                                            onChange={(e) => setUser({...user, monthOfBirth: e.target.value})}
                                            placeholder={"Місяць"}/>
                                        <input
                                            type="number"
                                            name={"yearOfBirth"}
                                            id={"yearOfBirth"}
                                            value={user.yearOfBirth || ''}
                                            onChange={(e) => setUser({...user, yearOfBirth: e.target.value})}
                                            placeholder={"Рік"}/>
                                    </div>
                                    {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
                                </div>

                                <button type="submit">Зберегти змiни</button>
                            </form>
                        </div>
                    </div>

                    <div className="user-tarif profile-card">
                        <h2>ТвІй тариф</h2>

                        <div className="tarif">
                            <div>
                                {user.role ? (<p>{user.role.description}</p>) : (<p>{tarif}</p>)}

                                <p>активний до 24.04.2024</p>
                            </div>

                            <div className="status">
                                <p>активний</p>
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

                    <div className="balance-parent-control">
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
                                <div className="button" onClick={changeParentControlStatus}>
                                    Налаштувати
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="user-films">
                    <h2>мІЙ КіНОЗАЛ</h2>
                    <div className="user-film-list">
                        {filmList ? filmList.map(film => {
                            console.log(`ФИЛЬМ: ${film}`)
                            return (
                                <div className={"film"}>
                                    <Movie movie={film}></Movie>
                                </div>
                            )
                        }) : (
                            <div>
                                Тут ничего нет...
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}