import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import krainaHD from './krainaHD.svg';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [movieLogos, setMovieLogos] = useState({});
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchLogos = async () => {
            const logos = {};
            for (let movie of movies) {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=6354d9421b6c9d2510d1a693d1dc40b4`);
                    const data = await response.json();
                    const logo = data.logos.find(img => img.iso_639_1 === 'uk' || img.iso_639_1 === 'en');
                    logos[movie.id] = logo ? `https://image.tmdb.org/t/p/w500${logo.file_path}` : null;
                } catch (error) {
                    console.error(`Error fetching logo for movie ${movie.id}:`, error);
                }
            }
            setMovieLogos(logos);
        };

        if (movies.length > 0) {
            fetchLogos();
        }
    }, [movies]);

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

    const handleCardClick = (id) => {
        navigate(`/movies/${id}`);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Box display="flex" flexDirection="column" color="#FFFFFF" justifyContent="center" height="100%">
                        <Typography variant="h4" component="h2" gutterBottom>
                            Ласкаво просимо<br />
                            на сайт Kraina HD <br />
                        </Typography>
                        <Typography variant="h7" component="p">
                            Дивіться тисячі фільмів та телешоу у HD-якості.<br />
                            Насолоджуйтесь кінематографічними враженнями,<br />
                            не виходячи із власного дома, з Kraina HD.
                        </Typography>
                        <Box mt={2} display="flex" flexDirection="column">
                            <Button variant="contained" color="secondary" style={{ marginBottom: '10px' }}>
                                Спробувати на 7 днiв
                            </Button>
                            <Button variant="contained" color="primary" onClick={scrollToPlans}>
                                Переглянути всі плани
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Slider {...settings}>
                        {movies.map((movie) => (
                            <Card key={movie.id} className="carousel-card" onClick={() => handleCardClick(movie.id)}>
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
                                        {movieLogos[movie.id] ? (
                                            <img src={movieLogos[movie.id]} alt={movie.title} className="movie-logo" />
                                        ) : (
                                            <Typography className="title">{movie.title}</Typography>
                                        )}
                                        <Typography className="rating">{movie.vote_average} (IMDb)</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Slider>
                </Grid>
            </Grid>
            <Typography color="#FFFFFF" textAlign="center" marginTop="100px">
                <h2>Платформа кіно та мультиплікації Кraina HD</h2>
                Кrainа HD — це онлайн кінотеатр з легальним контентом від українських та міжнародних студій в Full HD та Ultra HD якості. З широким ассортиментом фільмів,<br />
                серіалів, мультфільмів та мультсеріалів!<br />
                Платформа Краiна HD обов'язково задовольнить смаки всіх членів твоєї сім'ї та дозволить насолодитися улюбленим контентом на будь-якому пристрої.<br />
                Наша команда впроваджує найкращі практики на ринку, щоб створити найкращий досвід для користувачів.<br />
                <h2>Фільми</h2>
                На Кrаinа HD ти знайдеш фільми на будь-який смак: від популярних блокбастерів до сімейних мелодрам. Платформа пропонує як новинки, так і класичні фільми, а також ексклюзивні прем'єри.<br />
                <h2>Серіали</h2>
                Кrаinа HD — це справжній рай для любителів серіалів. На платформі представлені як популярні американські шоу, так і українські новинки.<br />
                Смотри серіали в прямому ефірі або в записі, а також скачивай їх для перегляду в офлайн-режимі на мобільному пристрої.<br />
                <h2>Мультфільми</h2>
                В каталоге Кrаinа HD батьки знайдуть найкращі мультфільми для дітей різного віку. Пізнавальні розповіді для малюків, захоплюючі пригодидля старших дітей та атмосферні історії для перегляду всією сім'єю.<br />
                <h2>Доступні плани під будь-які потреби</h2>
                Дивіться фільми  скільки завгодно на телефоні, смарт-телевізорі та іншихпристроях. Просто оберіть підписку. Оплата різними способами. Скасувати підписку можна в будь-який момент.<br />
            </Typography>
            <Grid container spacing={3} mt={5} id="plans">
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="MuiCard-root card">
                        <CardContent className="card-content">
                            <Typography variant="h5" component="div">
                                <img src={krainaHD} alt="Логотип" className="krainaHD" /> <br />
                                Базовий
                            </Typography>
                            <Typography variant="body2">
                                120 ₴ в месяц <br />
                                <span className="premaritalСolor">• Якість відео та звуку</span> <br />
                                Нормальна <br /> <hr />
                                <span className="premaritalСolor">• Роздільна здатність</span> <br />
                                1080p (Full HD) <br /> < hr />
                                <span className="premaritalСolor">• Просторовий звук (Об'ємний звук)</span> <br />
                                - <br /> < hr />
                                <span className="premaritalСolor">• Підтримувані пристрої</span> <br />
                                Телевізор, Комп'ютер, Телефон, Планшет <br /> < hr />
                                <span className="premaritalСolor">• Кількість пристроїв, які можуть одночасно дивитися у вашій сім'ї</span> <br />
                                2 <br /> < hr />
                                <span className="premaritalСolor">• Завантажити пристрої</span> <br />
                                2 <br /> < hr />
                                <span className="premaritalСolor">• Реклама</span> <br />
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
                                <img src={krainaHD} alt="Логотип" className="krainaHD" /> <br />
                                Стандарт
                            </Typography>
                            <Typography variant="body2">
                                150 ₴ в месяц <br />
                                <span className="premaritalСolor">• Якість відео та звуку</span> <br />
                                Нормальна <br /> < hr />
                                <span className="premaritalСolor">• Роздільна здатність</span> < br />
                                1080p (Full HD) < br /> < hr />
                                <span className="premaritalСolor">• Просторовий звук (Об'ємний звук)</span> < br />
                                - < br /> < hr />
                                <span className="premaritalСolor">• Підтримувані пристрої</span> < br />
                                Телевізор, Комп'ютер, Телефон, Планшет < br /> < hr />
                                <span className="premaritalСolor">• Кількість пристроїв, які можуть одночасно дивитися у вашій сім'ї</span> < br />
                                2 < br /> < hr />
                                <span className="premaritalСolor">• Завантажити пристрої</span> < br />
                                2 < br /> < hr />
                                <span className="premaritalСolor">• Реклама</span> < br />
                                Без реклами < br />
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
                                <img src={krainaHD} alt="Логотип" className="krainaHD" /> <br />
                                Преміум
                            </Typography>
                            <Typography variant="body2">
                                200 ₴ в месяц <br />
                                <span className="premaritalСolor">• Якість відео та звуку</span> < br />
                                Чудова < br /> < hr />
                                <span className="premaritalСolor">• Роздільна здатність</span> < br />
                                4К (Ultra HD) + HDR < br /> < hr />
                                <span className="premaritalСolor">• Просторовий звук (Об'ємний звук)</span> < br />
                                Увімкнено < br /> < hr />
                                <span className="premaritalСolor">• Підтримувані пристрої</span> < br />
                                Телевізор, Комп'ютер, Телефон, Планшет < br /> < hr />
                                <span className="premaritalСolor">• Кількість пристроїв, які можуть одночасно дивитися у вашій сім'ї</span> < br />
                                4 < br /> < hr />
                                <span className="premaritalСolor">• Завантажити пристрої</span> < br />
                                6 < br /> < hr />
                                <span className="premaritalСolor">• Реклама</span> < br />
                                Без реклами < br />
                            </Typography>
                        </CardContent>
                        <div className="card-button-container">
                            <Button className="card-button btnPrem" variant="contained" color="primary">
                                Отримати Премиум
                            </Button>
                        </div>
                    </Card>                    
                </Grid>
                
            </Grid>
                <Typography color="#FFFFFF" textAlign="center">
                    <h2>Є питання?</h2>
                    <h6>Відповідаемо<br /><br /> Ще більше інформації можна знайти</h6>
                </Typography>
        </Container>
    );
}

export default Home;
