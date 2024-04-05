import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MapComponent from './Components/MapComponent.jsx'
import DetailsComponent from './Components/DetailsComponent.jsx'
import './index.css'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
        <div className='navbar'>  
          <Link to={"/"}>Home</Link>
          <Link to={"/map"}>Map</Link>
        </div>
  <Routes>
      <Route index={true} path="/" element={<App />} />
      <Route index={true} path="/map" element={<MapComponent />} />
      <Route index={true} path="/:id" element={<DetailsComponent />} />
  </Routes>
</BrowserRouter>

)
