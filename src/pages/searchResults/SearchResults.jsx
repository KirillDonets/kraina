import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, CircularProgress, Grid, Card, CardMedia, Typography, Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const params = new URLSearchParams(location.search);
      const query = params.get('query');

      if (query) {
        try {
          const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=uk-UA&query=${query}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json;charset=utf-8'
            }
          });
          const data = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error('Ошибка при загрузке результатов поиска:', error);
        }
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
  return (
    <Container maxWidth="lg">
      <h1 className='textwhite'>Результати пошуку</h1>
      <Box className="divider"></Box>
      <Grid container spacing={2} sx={{ rowGap: '50px' }}>
        {results.map((movie) => (
          <Grid item key={movie.id} xs={6} sm={6} md={3} lg={2}>
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
              <Card style={{
                    backgroundColor: "transparent",
                    margin: "auto",
                    boxShadow: "none"
                }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                  alt={movie.title}
                  className="poster"
                />
                <div className="movie-title">
                        {movie.title ? movie.title : movie.name}
                    </div>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box className="divider"></Box>
      <IconButton
                color="primary"
                onClick={scrollToTop}
                style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#FFFFFF' }}
            >
            <ArrowUpwardIcon />
            </IconButton>
    </Container>
  );
};

export default SearchResults;
