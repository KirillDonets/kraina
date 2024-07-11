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
import TvDetails from "../pages/movieDetails/TvDetails";
import Filmography from '../pages/filmography/Filmography';
import SearchResults from '../pages/searchResults/SearchResults';
import Profile from "../pages/profile/Profile";
import ProfilePayment from "../pages/profile/ProfilePayment";
import AdminPanel from "../pages/admin/AdminPanel";
import AdminNavbar from "../pages/admin/AdminNavbar";
import UserManagement from "../pages/admin/UserManagement";
import MovieManagement from "../pages/admin/MovieManagement";
import AddMovieManagement from "../pages/admin/AddMovieManagement";
import AddDirectorManagement from "../pages/admin/AddDirectorManagement";
import AddActorManagement from "../pages/admin/AddActorManagement";
import HomePage from "../pages/homePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Page Not Found</h1>,
    children: [
      { index: true, element: <Home /> },
      { path: '/faq', element: <Faq /> },
      {path: "/homePage", element: <HomePage/>},
      { path: '/registration', element: <Registration /> },
      { path: '/animatedSeries', element: <AnimatedSeries /> },
      { path: '/cartoons', element: <Cartoons /> },
      { path: '/movies', element: <Movies /> },
      { path: '/series', element: <Series /> },
      { path: '/search', element: <SearchResults /> },
      { path: '/navigation', element: <Navigation /> },
      { path: '/admin', element: <AdminPanel /> },
      { path: '/admin/navbar', element: <AdminNavbar /> },
      { path: '/admin/user-management', element: <UserManagement /> },
      { path: '/admin/movie-management', element: <MovieManagement /> },
      { path: '/movieDetails/:id', element: <MovieDetails /> },
      { path: '/movies/:id', element: <MovieDetails /> },
      { path: '/tv/:id', element: <TvDetails /> },
      { path: '/person/:id', element: <Filmography /> },
      { path: '/profile', element: <Profile /> },
      { path: '/profile/payment', element: <ProfilePayment /> },


      {path: "/admin/films", element: <MovieManagement/>},
      {path: "/admin/users", element: <UserManagement/>},
      {path: "/admin/filmsAdd", element: <AddMovieManagement/>},
      {path: "/admin/directorsAdd", element: <AddDirectorManagement/>},
      {path: "/admin/actorsAdd", element: <AddActorManagement/>},
    ]
  },
]);

