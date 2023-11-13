// App.js
import React, { useState } from 'react';
import Mapa from './components/Mapa';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [drawPolygon, setDrawPolygon] = useState(false);
  const [polygons, setPolygons] = useState([]);

  const updatePolygonsList = (newPolygon) => {
    setPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
  };

  const handleDrawPolygon = () => {
    setDrawPolygon(!drawPolygon);
  };

  return (
    <>
      <div className="app">
        <Sidebar polygons={polygons} onDrawPolygonClick={handleDrawPolygon} updatePolygonsList={updatePolygonsList} />
        <div className="content">
          <Mapa drawPolygon={drawPolygon} updatePolygonsList={updatePolygonsList} />
        </div>
      </div>
    </>
  );
}

export default App;