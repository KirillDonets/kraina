import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ScrollTop = () => {
    return (
        <IconButton
            color="primary"
            onClick={scrollToTop}
            style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#FFFFFF' }}
        >
            <ArrowUpwardIcon />
        </IconButton>
    );
}

export default ScrollTop;
