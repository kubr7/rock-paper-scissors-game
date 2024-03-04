import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
class App extends Component {

  render() {
    return (
      <div className='app'>
        <Router>
        <Navbar/>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
