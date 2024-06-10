import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import Slider from 'react-slick';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=6354d9421b6c9d2510d1a693d1dc40b4&language=uk-UA&page=1');
                const data = await response.json();
                setMovies(data.results.slice(0, 20)); // Top 20 новинок
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const scrollToPlans = () => {
        const element = document.getElementById("plans");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                        <Typography variant="h4" component="h1" gutterBottom>
                            Ласкаво просимо<br />
                        </Typography>
                        <Typography variant="h6" component="p">
                            на сайт Kraina HD <br /> Дивіться тисячі фільмів та телешоу у HD-якості.<br />
                            Насолоджуйтесь кінематографічними враженнями,<br />
                            не виходячи із власного дома, з Kraina HD.
                        </Typography>
                        <Box mt={2} display="flex" flexDirection="column">
                            <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>
                                Спробувати на 7 днiв
                            </Button>
                            <Button variant="contained" color="secondary" onClick={scrollToPlans}>
                                Переглянути всі плани
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Slider {...settings}>
                        {movies.map((movie) => (
                            <Card key={movie.id} className="carousel-card">
                                <Box className="poster-container">
                                    <CardMedia
                                        component="img"
                                        alt={movie.title}
                                        height="500"
                                        image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                        title={movie.title}
                                        className="poster-image"
                                    />
                                    <Box className="poster-overlay">
                                        <Typography className="rating">{movie.vote_average} (IMDb)</Typography>
                                        <Typography className="title">{movie.title}</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Slider>
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={5} id="plans">
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="MuiCard-root card">
                        <CardContent className="card-content">
                            <Typography variant="h5" component="div">
                                Базовий
                            </Typography>
                            <Typography variant="body2">
                                120 ₴ в месяц <br />
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
                            <Button className="card-button btnBase" variant="contained">
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
                                120 ₴ в месяц <br />
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
                            <Button className="card-button btnStandart" variant="contained" color="primary">
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
                                120 ₴ в месяц <br />
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
                            <Button className="card-button btnPrem" variant="contained" color="primary">
                                Отримати Премиум
                            </Button>
                        </div>
                    </Card>
                    <div >
                        Є питання.<br />
                        Відповідаемо<br />
                        Ще більше інформації можна знайти
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;
