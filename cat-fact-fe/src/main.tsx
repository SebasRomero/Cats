
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Facts from './components/facts/Facts.tsx';
import NavBar from './components/navbar/NavBar.tsx';
import CreateFact from './components/facts/CreateFact.tsx';
import RandomFact from './components/facts/RandomFact.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <NavBar/>
   <Routes>
      <Route path="/" element={<App />} />
      <Route path="/facts" element={<Facts />}/>
      <Route path="/create-fact" element={<CreateFact />}/>
      <Route path="/random-fact" element={<RandomFact />}/>
    </Routes>
  </BrowserRouter>
)
