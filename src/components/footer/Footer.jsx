import React from 'react';
import { Container, Grid, Link, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import './Footer.css'; // Импортируем CSS файл

const Footer = () => {
    return (
        <footer className="footer">
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4} className="footer-section">
                        <Typography variant="h6" component="h2">О нас</Typography>
                        <Typography variant="body2">
                            Мы предоставляем лучшие услуги для наших клиентов.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} className="footer-section">
                        <Typography variant="h6" component="h2">Полезные ссылки</Typography>
                        <ul>
                            <li><Link href="#" color="inherit">Главная</Link></li>
                            <li><Link href="#" color="inherit">О нас</Link></li>
                            <li><Link href="#" color="inherit">Услуги</Link></li>
                            <li><Link href="#" color="inherit">Контакты</Link></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={4} className="footer-section">
                        <Typography variant="h6" component="h2">Контакты</Typography>
                        <Typography variant="body2">
                            Телефон: +123 456 7890 <br />
                            Email: info@example.com
                        </Typography>
                        <div className="social-icons">
                            <Link href="#" color="inherit"><Facebook /></Link>
                            <Link href="#" color="inherit"><Twitter /></Link>
                            <Link href="#" color="inherit"><Instagram /></Link>
                            <Link href="#" color="inherit"><LinkedIn /></Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;
