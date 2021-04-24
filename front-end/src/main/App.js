import React from 'react';
import Menu from '../components/menu';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'
import './App.css'

function App() {
  return (
    <div id="app">
      <BrowserRouter>
      <Menu></Menu>
      <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
