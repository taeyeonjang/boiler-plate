
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import NavBar from './views/NavBar/NavBar';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import MovieDetail from './views/MovieDetail/MovieDetail';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
    <Route path ="/" element = {<LandingPage />} />
    <Route path ="/login" element = {<LoginPage />} />
    <Route path ="/register" element = {<RegisterPage />} />
    <Route path ="/movie/:movieId" element = {<MovieDetail />} />


    </Routes>

    </BrowserRouter>

  );
}

export default App;
