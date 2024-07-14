import {AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography,} from "@mui/material";
import React, {useState, useEffect} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {NavLink} from "react-router-dom";
import HeaderIcons from "./HeaderIcons";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import krainaHD from './krainaHD.svg';
import "./Header.css";
import axios from "axios";

const settings = [{name: "Профiль", link: "/profile"},];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [user, setUser] = useState(null);
    const [isUserLogged, setIsUserLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const tokenAuth = localStorage.getItem('Auth');

    function getUser() {
        axios.get("https://0099-217-199-237-96.ngrok-free.app/api/user/get", {
            headers: {'Authorization': `Basic ${tokenAuth}`}
        })
            .then(resp => {
                if (resp.request.responseURL === 'https://0099-217-199-237-96.ngrok-free.app/api/user/get') {
                    setIsUserLogged(true)
                }
            })

    }

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

    // Симуляция получения данных о пользователе
    useEffect(() => {
        async function fetchUserRoles() {
            try {
                const response = await axios.get("https://0099-217-199-237-96.ngrok-free.app/api/user/getUserRoles", {
                    headers: { 'Authorization': `Basic ${tokenAuth}` }
                });
                const role = response.data; // assuming response.data.authorities is an array of roles
                if (role && role.roleName === 'ROLE_ADMIN') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
                console.log("User roles:", role);
            } catch (error) {
                console.error("Error fetching user roles:", error);
            }
        }


        fetchUserRoles();
        getUser()
    }, []);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar style={{padding: 0}}>
                        <NavLink to="/">
                            <img src={krainaHD} alt="Логотип" className="krainaHD1"/>
                        </NavLink>

                        {/* Mobile menu */}
                        <Box
                            sx={{
                                flexGrow: 0,
                                marginLeft: "auto",
                                display: {xs: "flex", md: "none"},
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
                                <MenuIcon/>
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
                                    display: {xs: "block", md: "none"},
                                }}
                            >
                                {isAdmin ? (
                                    <NavLink to="/admin" className="menu-item-mobile">
                                        Admin
                                    </NavLink>
                                ): (<></>)}
                                {isUserLogged ? (<NavLink to="/homePage" className="menu-item-mobile">
                                    Головна
                                </NavLink>) : (<div></div>)}

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
                                display: {xs: "none", md: "flex"},
                            }}
                        >
                            {isAdmin ? (
                                <NavLink to="/admin" className="menu-item-mobile">
                                    Admin
                                </NavLink>
                            ): (<></>)}
                            {isUserLogged ? (<NavLink to="/homePage" className="menu-item-mobile">
                                Головна
                            </NavLink>) : (<div></div>)}
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
                            <HeaderIcons/>
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Typography
                                        component="div"
                                        sx={{
                                            mr: 1,
                                            mt: 1,
                                            color: "#FFC700",
                                        }}
                                    >
                                        <PersonOutlineIcon/>
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: "45px"}}
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
                                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                        <NavLink to={setting.link}>
                                            <Typography textAlign="center">{setting.name}</Typography>
                                        </NavLink>
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
