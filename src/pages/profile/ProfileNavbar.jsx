import React from 'react';
import './Profile.css';
import settings from './images/settings.svg';
import card from './images/card.svg';
import pc from './images/pc.svg';
import book from './images/book.svg';
import gift from './images/gift.svg';
import { Link } from 'react-router-dom';

const navItems = [
    { img: settings, title: 'Особисті дані', link: '#' },
    { img: card, title: 'Карточка', link: '#' },
    { img: pc, title: 'ПК', link: '#' },
    { img: book, title: 'Книга', link: '#' },
    { img: gift, title: 'Подарунок', link: '#' }
];

export default function ProfileNavbar({ active }) {
    return (
        <div className="profile-nav">
            <ul className="list">
                {navItems.map((item, index) => (
                    <li key={index} className={`card ${active === index ? 'active' : ''}`}>
                        <Link to={item.link}>
                            <div className="card-content">
                                <img src={item.img} alt="" />
                                <h2>{item.title}</h2>
                                <a href={item.link}>Оформи під себе</a>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
