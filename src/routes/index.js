import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Faq from "../pages/faq/Faq";
import Registration from "../pages/registration/Registration";
import AnimatedSeries from "../pages/animatedSeries/AnimatedSeries";
import Cartoons from "../pages/cartoons/Cartoons";
import Movies from "../pages/movies/Movies";
import Series from "../pages/series/Series";
import Navigation from "../pages/navigation/Navigation";
import MovieDetails from "../pages/movieDetails/MovieDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Page Not Found</h1>,
    children: [
      { index: true, element: <Home /> },
      { path: '/faq', element: <Faq /> },
      { path: '/registration', element: <Registration /> },
      { path: '/animatedSeries', element: <AnimatedSeries /> },
      { path: '/cartoons', element: <Cartoons /> },
      { path: '/movies', element: <Movies /> },
      { path: '/series', element: <Series /> },
      { path: '/navigation', element: <Navigation /> },
      { path: '/movies/:id', element: <MovieDetails /> }
    ]
  },
]);
