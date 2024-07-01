import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

const navItems = [
    { title: 'Управление Пользователями', link: '/admin/users' },
    { title: 'Управление Фильмами', link: '/admin/movies' },
];

export default function AdminNavbar() {
    return (
        <div className="admin-nav">
            <ul className="list">
                {navItems.map((item, index) => (
                    <li key={index} className="card">
                        <Link to={item.link}>
                            <div className="card-content">
                                <h2>{item.title}</h2>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
