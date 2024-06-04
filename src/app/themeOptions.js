import { createTheme } from "@mui/material";

export const themeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#151E27',
            light: '#1D2733',
        },
        secondary: {
            main: '#6fedff',
        },
        background: {
            default: '#27313D',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(245,0,0,0.6)',
            hint: '#3c15ff',
        },
    },
    typography: {
        fontFamily: 'Inter',
        htmlFontSize: 14,
        h1: {
            fontSize: 24,
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 700,
        },
        button: {
            fontSize: 16,
        },
    },
});