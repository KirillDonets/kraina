import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, CircularProgress, Grid, Card, CardMedia, Typography } from '@mui/material';

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

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {results.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2}>
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                  alt={movie.title}
                />
                <Typography variant="body2" align="center"  color="black">{movie.title}</Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchResults;