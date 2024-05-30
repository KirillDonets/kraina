import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import './Home.css'; // Импортируем CSS файл

const Home = () => {
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
                                Отримати Премиум
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
        </Container>
    );
}

export default Home;
