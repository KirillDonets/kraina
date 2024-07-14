import { useState, useRef, useEffect } from "react";
import { Typography, InputBase, Box, Popper, Paper, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link, useNavigate } from "react-router-dom";
import api from "../../app/http";

const HeaderIcons = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const response = await api.get('film/all');
            setMovies(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    fetchMovies();
    document.body.addEventListener('click', closeSearch)
}, []);

const closeSearch = (e)=>{
  console.log('CLOSE', e.target);

  if(e.target && e.target.closest('serach-1'))
    console.log('CLOSE', e.target);
}

  const handleSearchClick = () => {
    setSearchOpen(true);
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const searchPattern = new RegExp(query, "gi")
      const searchedMovies = movies.filter(movie=> searchPattern.test(movie.title))
      setSearchResults(searchedMovies.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (id) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/movies/${id}`);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleBlur = (event) => {
   /* console.log(event.relatedTarget);
    if(event.currentTarget.closest('.search-1')){
      console.log(1);
    }*/
    if (!event.currentTarget.contains(event.relatedTarget)) {
     // setSearchResults([]);
     // setSearchOpen(false);
    }
  };

  return (
    <Box display="flex" className="search-1" alignItems="center" onBlur={handleBlur}>
      <Typography
        component="div"
        sx={{
          mr: 1,
          mt: 1,
          color: "#FFC700",
          position: 'relative'
        }}
      >
        <SearchIcon onClick={handleSearchClick} />
        {searchOpen && (
          <Box
            component="form"
            onKeyPress={handleSearchSubmit}
            className="searchBox"
            sx={{
              position: 'absolute',
              top: 0,
              right: '140%',
              ml: 2,
              backgroundColor: '#333',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              zIndex: 1,
              width: searchOpen ? '200px' : '0px',
              overflow: 'hidden',
              transition: 'width 0.5s',
            }}
          >
            <InputBase
              ref={searchInputRef}
              placeholder="Пошук фільмів..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ ml: 1, flex: 1, color: '#fff' }}
              autoFocus
            />
            {searchResults.length > 0 && (
              <Popper open={Boolean(searchResults.length)} style={{ width: '100%', zIndex: 2 }}>
                <Paper>
                  <List>
                    {searchResults.map((result) => (
                      <ListItem button key={result.id} onClick={() => handleResultClick(result.id)}>
                        <Link to="/"> <ListItemText primary={result.title} /></Link>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Popper>
            )}
          </Box>
        )}
      </Typography>

      <Typography
        component="div"
        sx={{
          mr: 1,
          mt: 1,
          color: "#FFC700",
        }}
      >
        <NotificationsNoneIcon />
      </Typography>
      <Typography
        component="div"
        sx={{
          mr: 1,
          mt: 1,
          color: "#FFC700",
        }}
      >
        <BookmarkBorderIcon />
      </Typography>
    </Box>
  );
};

export default HeaderIcons;
