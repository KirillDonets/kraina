import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Faq from "../pages/faq/Faq";
import AnimatedSeries from "../pages/animatedSeries/animatedSeries";
import Cartoons from "../pages/cartoons/cartoons";
import Movies from "../pages/movies/movies";
import Series from "../pages/series/series";
import Login from "../pages/login/Login";
import Registration from '../pages/registration/Registration';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>Page Not Found</h1>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/faq',
                element: <Faq />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/registration',
                element: <Registration />
            },
            {
                path: '/animatedSeries',
                element: <AnimatedSeries />
            },
            {
                path: '/cartoons',
                element: <Cartoons />
            },
            {
                path: '/movies',
                element: <Movies />
            },
            {
                path: '/series',
                element: <Series />
            }
        ]
    },
]);