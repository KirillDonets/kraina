import { Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const HeaderIcons = () => {
  return (
    <>
      <Typography
        component="div"
        sx={{
          mr: 1,
          mt: 1,
          color: "#FFC700",
        }}
      >
        <SearchIcon />
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
    </>
  );
};

export default HeaderIcons;
