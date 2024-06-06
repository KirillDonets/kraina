import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import Slider from 'react-slick';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const Home = () => {
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        const fetchNewReleases = async () => {
            try {
                const response = await fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&language=uk-UA&page=1`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                const data = await response.json();
                setNewReleases(data.results.slice(0, 20));
            } catch (error) {
                console.error('Ошибка при загрузке новинок:', error);
            }
        };

        fetchNewReleases();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Container maxWidth="lg">
            <h1>Home</h1>
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="MuiCard-root card">
                        <CardContent className="card-content">
                            <Typography variant="h5" component="div">
                                Базовий
                            </Typography>
                            <Typography variant="body2">
                                120 ₴ в месяц <br />
                                • Якість відео та звуку <br />
                                Нормальна <br /> <hr />
                                • Роздільна здатність <br />
                                1080p (Full HD) <br /> <hr />
                                • Просторовий звук (Об'ємний звук) <br />
                                - <br /> <hr />
                                • Підтримувані пристрої <br />
                                Телевізор, Комп'ютер, Телефон, Планшет <br /> <hr />
                                • Кількість пристроїв, які можуть одночасно дивитися у вашій сім'ї <br />
                                2 <br /> <hr />
                                • Завантажити пристрої <br />
                                2 <br /> <hr />
                                • Реклама
                                Кілька рекламних пауз <br />
                            </Typography>
                        </CardContent>
                        <div className="card-button-container">
                            <Button className="card-button" variant="contained" color="primary">
                                Отримати Базовий
                            </Button>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="MuiCard-root card">
                        <CardContent className="card-content">
                            <Typography variant="h5" component="div">
                                Стандарт
                            </Typography>
                            <Typography variant="body2">
                                120 ₴ в месяц <br />
                                • Якість відео та звуку <br />
                                Нормальна <br /> <hr />
                                • Роздільна здатність <br />
                                1080p (Full HD) <br /> <hr />
                                • Просторовий звук (Об'ємний звук) <br />
                                - <br /> <hr />
                                • Підтримувані пристрої <br />
                                Телевізор, Комп'ютер, Телефон, Планшет <br /> <hr />
                                • Кількість пристроїв, які можуть одночасно дивитися у вашій сім'ї <br />
                                2 <br /> <hr />
                                • Завантажити пристрої <br />
                                2 <br /> <hr />
                                • Реклама
                                Без реклами <br />
                            </Typography>
                        </CardContent>
                        <div className="card-button-container">
                            <Button className="card-button" variant="contained" color="primary">
                                Отримати Стандарт
                            </Button>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="MuiCard-root card">
                        <CardContent className="card-content">
                            <Typography variant="h5" component="div">
                                Преміум
                            </Typography>
                            <Typography variant="body2">
                                120 ₴ в месяц <br />
                                • Якість відео та звуку <br />
                                Чудова <br /> <hr />
                                • Роздільна здатність <br />
                                4К (Ultra HD) + HDR <br /> <hr />
                                • Просторовий звук (Об'ємний звук) <br />
                                Увімкнено <br /> <hr />
                                • Підтримувані пристрої <br />
                                Телевізор, Комп'ютер, Телефон, Планшет <br /> <hr />
                                • Кількість пристроїв, які можуть одночасно дивитися у вашій сім'ї <br />
                                4 <br /> <hr />
                                • Завантажити пристрої <br />
                                6 <br /> <hr />
                                • Реклама
                                Без реклами <br />
                            </Typography>
                        </CardContent>
                        <div className="card-button-container">
                            <Button className="card-button" variant="contained" color="primary">
                                Отримати Преміум
                            </Button>
                        </div>
                    </Card>
                    <div>
                        Є питання.<br />
                        Відповідаемо<br />
                        Ще більше інформації можна знайти
                    </div>
                </Grid>
            </Grid>
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Топ-20 новинок</Typography>
                <Slider {...settings}>
                    {newReleases.map((movie) => (
                        <div key={movie.id}>
                            <Card className="movie-card">
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        title={movie.title}
                                    />
                                    <Typography variant="h6">{movie.title}</Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </Box>
        </Container>
    );
}

export default Home;
