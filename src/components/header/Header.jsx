import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import HeaderIcons from "./HeaderIcons";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import krainaHD from './krainaHD.svg';
import "./Header.css";

const settings = ["Profile", "Account", "Dashboard", "Logout"];


const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar style={{padding: 0}}>
            <NavLink to="/">
                <img src={krainaHD} alt="Логотип" className="krainaHD1" />
            </NavLink>

            {/* Mobile menu */}
            <Box
              sx={{
                flexGrow: 0,
                marginLeft: "auto",
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <NavLink to="/movies" className="menu-item-mobile">
                  Фільми
                </NavLink>
                <NavLink to="/series" className="menu-item-mobile">
                  Серiали
                </NavLink>
                <NavLink to="/cartoons" className="menu-item-mobile">
                  Мультфільми
                </NavLink>
                <NavLink to="/animatedSeries" className="menu-item-mobile">
                  Мультсеріали
                </NavLink>
                {/* <NavLink to="/navigation" className="menu-item-mobile">
                  Фільтри
                </NavLink> */}
                <NavLink to="/faq" className="menu-item-mobile">
                  FAQ
                </NavLink>
                <NavLink to="/registration" className="menu-item-mobile">
                  Регістрація
                </NavLink>
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                marginLeft: "auto",
                alignItems: "center",
                display: { xs: "none", md: "flex" },
              }}
            >
              <NavLink to="/movies" className="menu-item">
                Фільми
              </NavLink>
              <NavLink to="/series" className="menu-item">
                Серiали
              </NavLink>
              <NavLink to="/cartoons" className="menu-item">
                Мультфільми
              </NavLink>
              <NavLink to="/animatedSeries" className="menu-item">
                Мультсеріали
              </NavLink>
              {/* <NavLink to="/navigation" className="menu-item">
              Фільтри
              </NavLink> */}
              <NavLink to="/faq" className="menu-item">
                FAQ
              </NavLink>
              <NavLink to="/registration" className="menu-item">
                Регістрація
              </NavLink>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 1,
                  color: "#FFC700",
                  fontSize: "30px",
                }}
              >
                |
              </Typography>
              <HeaderIcons />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography
                    component="div"
                    sx={{
                      mr: 1,
                      mt: 1,
                      color: "#FFC700",
                    }}
                  >
                    <PersonOutlineIcon />
                  </Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" color={'#000'}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
