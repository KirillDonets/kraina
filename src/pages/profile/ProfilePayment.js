import React, {useState} from 'react'
import {Container} from "@mui/material";
import ProfileNavbar from "./ProfileNavbar";

import './ProfileGlobal.css'
import './ProfilePayment.css'
import {Link} from "react-router-dom";

import settings from './images/settings.svg';

export default function ProfilePayment() {
    const [balance, setBalance] = useState(0)
    const [abonpayment, setAbonpayment] = useState(0)
    return (
        <div className="payment profile-settings">
            <Container maxWidth={"lg"}>
                <div>
                    <h1>Управління особистими даними</h1>
                </div>
                <ProfileNavbar active={1}></ProfileNavbar>

                <div className="main">
                    <h2>ОПЛАТА І КАРТКИ</h2>

                    <div className="info">
                        <div className="info-card">
                            <h3>Абонплата</h3>
                            <p>{abonpayment} грн.</p>
                        </div>

                        <div className="info-card">
                            <h3>Баланс</h3>
                            <p>{balance} грн.</p>
                        </div>
                    </div>

                    <div className="actions">
                        <Link to={"/profile/tariffs"} className="button button_highlighted">Підключити тариф</Link>
                        <Link to={"#"} className="button">Оплатити</Link>
                        <Link to={"#"} className="button"><span className="large-elem">Налаштування передплати</span>
                            <div className="small-elem">
                                <img src={settings} alt=""/>
                                <span>Передплати</span>
                            </div></Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}
