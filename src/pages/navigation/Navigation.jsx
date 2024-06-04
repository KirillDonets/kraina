import React, { useState, useEffect } from 'react';
import {  Drawer,  List,  ListItem,  ListItemText,  Typography,  IconButton,  Box,  Container,  Grid,  Card,  CardMedia,  CircularProgress} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Navigation.css';

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
const baseUrl = 'https://api.themoviedb.org/3';

const Navigation = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortedBy, setSortedBy] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=uk-UA`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        });
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseUrl}/discover/movie?api_key=${apiKey}&language=uk-UA&sort_by=${sortedBy}&with_genres=${selectedGenre}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json;charset=utf-8',
            },
          }
        );
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenre, sortedBy]);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleSortByChange = (sortBy) => {
    setSortedBy(sortBy);
  };

  return (
    <Container maxWidth="lg" className="navigationContainer">
      <Box className="drawerBox">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          className="menuButton"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={toggleDrawer}
          className="drawer"
          classes={{ paper: 'drawerPaper' }}
        >
          <Box className="drawerContent">
            <Typography variant="h6" className="drawerTitle">Фільтри і сортування</Typography>
            <List>
              <ListItem button onClick={() => handleSortByChange('popularity.desc')}>
                <ListItemText primary="По популярності" />
              </ListItem>
              <ListItem button onClick={() => handleSortByChange('vote_average.desc')}>
                <ListItemText primary="По рейтингу" />
              </ListItem>
              <ListItem button onClick={() => handleSortByChange('release_date.desc')}>
                <ListItemText primary="По року випуску" />
              </ListItem>
            </List>
            <Typography variant="h6" className="drawerTitle">Вибір жанру</Typography>
            <List>
              {genres.map((genre) => (
                <ListItem button key={genre.id} onClick={() => handleGenreSelect(genre.id)}>
                  <ListItemText primary={genre.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Box className="resultsBox">
        <Typography variant="h5" className="resultsTitle">Результати:</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="500"
                    image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={movie.title}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Navigation;
