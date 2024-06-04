import React from "react";
import { AppBar, Box, Container, IconButton, Toolbar, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="appBar">
        <Container maxWidth="lg">
          <Toolbar className="toolbar">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to="/" className="navLink">Kraina HD</NavLink>
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <NavLink to="/movies" className="navLink">Фільми</NavLink>
              <NavLink to="/series" className="navLink">Серiали</NavLink>
              <NavLink to="/cartoons" className="navLink">Мультфільми</NavLink>
              <NavLink to="/animatedSeries" className="navLink">Мультсеріали</NavLink>
              <NavLink to="/navigation" className="navLink">Навігація</NavLink>
              <NavLink to="/faq" className="navLink">FAQ</NavLink>
              <NavLink to="/registration" className="navLink">Регістрація</NavLink>
            </Box>

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
