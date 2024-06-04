import {  AppBar,  Box,  Button,  Container,  IconButton,  Toolbar,  Typography,} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import './Header.css';
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to="/">Kraina HD</NavLink>
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <NavLink to="/movies">Фільми</NavLink>
              <NavLink to="/series">Серiали</NavLink>
              <NavLink to="/cartoons">Мультфільми</NavLink>
              <NavLink to="/animatedSeries">Мультсеріали</NavLink>
              <NavLink to="/faq">FAQ</NavLink>
              <NavLink to="/registration">Регістрація</NavLink>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
