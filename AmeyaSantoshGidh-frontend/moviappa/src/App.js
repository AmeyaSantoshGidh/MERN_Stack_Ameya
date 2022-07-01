import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from  'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect } from 'react';

import MoviesList from "./components/MoviesList";
import Movie from "./components/Movie";
import { useState } from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AddReview from './components/AddReview'
import "./App.css"

function App() {
  const [user,setUser] = useState(null);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);
  

      return (
        <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
    <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
      <Container className="container-fluid">
      <Navbar.Brand className="brand" href="/">
      <img src="/images/movies-logo.png" alt="movies logo" className="moviesLogo"/>
        MOVIE TIME
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link}  to={"/movies"}>
              Movies
              </Nav.Link>
              </Nav>
              </Navbar.Collapse>
              { user ? (
                  <Logout setUser={setUser} />
                ) : (
                  <Login setUser={setUser} />
                )}
              </Container>
              </Navbar>

              <Routes>      
              <Route exact path={"/"} element={
                <MoviesList />}
                />
              <Route exact path={"/movies"} element={
                <MoviesList />}
                />
              <Route path={"/movies/:id"} element={
                <Movie user={ user } />}
                />
              <Route path={"/movies/:id/review"} element={
                <AddReview user={ user } />}
                />
              </Routes>
              </div>
              </GoogleOAuthProvider>
    );
    }     
  
export default App;