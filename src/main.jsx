import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Hero from './components/Hero';
import Survey from './components/Survey';
import Home from './components/Home';
import Project from './components/dynamic_components/Project'
import Seed from './components/Seed';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Hero />} />          
      <Route path="survey" element={<Survey />} /> 
      <Route path="home" element={<Home/>}>
        <Route path="project" element={<Project/>}/>
      </Route>
      <Route path="/seed" element={<Seed/>}></Route>
    </Route>
    
  </Routes>
</BrowserRouter>
);