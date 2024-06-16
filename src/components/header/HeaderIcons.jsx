import { useState, useRef } from "react";
import { Typography, InputBase, Box, Popper, Paper, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";

const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';

const HeaderIcons = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setSearchOpen(true);
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=uk-UA&query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      const data = await response.json();
      setSearchResults(data.results.slice(0, 5));
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
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setSearchResults([]);
      setSearchOpen(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" onBlur={handleBlur}>
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
            sx={{
              position: 'absolute',
              top: 0,
              left: '100%',
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
                        <ListItemText primary={result.title} />
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
