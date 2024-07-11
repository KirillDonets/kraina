import React from 'react';
import { Link } from 'react-router-dom';

import './AdminNavbar.css'

const navItems = [
    { title: 'Управління користувачами', link: '/admin/users' },
    { title: 'Управління фільмами', link: '/admin/films' },    
    { title: 'Додавання фільму', link: '/admin/filmsAdd' },
    { title: 'Додавання режисера', link: '/admin/directorsAdd' },
    { title: 'Додавання актора', link: '/admin/actorsAdd' }
];

export default function AdminNavbar({ active }) {
    return (
        <div className="profile-nav">
            <ul className="list">
                {navItems.map((item, index) => (
                    <li key={index} className={`card ${active === index ? 'active' : ''}`}>
                        <Link to={item.link}>
                            <div className="card-content">
                                <h2>{item.title}</h2>
                                <a href={item.link}></a>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
