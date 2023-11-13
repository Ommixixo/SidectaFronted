import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import './style.css';
import * as turf from '@turf/turf';
import API_BASE_URL from '../config';

const Mapa = ({ drawPolygon, updatePolygonsList }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    const map = mapRef.current?.leafletElement;
    if (map) {
      map.locate();
    }
  }, []);

  const handlePolygonCreated = async (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const name = window.prompt('INGRESE UN NOMBRE PARA GUARDAR EL POLIGONO:', '');
      if (name) {
        const polygonData = layer.toGeoJSON();
        const coordenadas = polygonData.geometry.coordinates;   
        let coordinates = polygonData.geometry.coordinates[0];  

        if (coordinates.length < 4) {
          window.alert('El polígono debe tener al menos cuatro puntos.');
          return;
        }
        const polygonFeature = turf.polygon([coordinates]);
        const areaSquareMeters = turf.area(polygonFeature);
        const areaHectares = areaSquareMeters / 10000;
  
        // Agrega las hectáreas al objeto de datos que se enviará al servicio REST
        const dataToSend = {
          name: name,
          coordinates: coordenadas,
          hectareas: areaHectares,
        };

        console.log(dataToSend);
  
        try {
          // Realiza la solicitud POST a la ruta del servicio en Laravel
          await fetch(`${API_BASE_URL}/polygon`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });
          
          window.alert('Polígono creado correctamente');
          updatePolygonsList(dataToSend);
        } 
        catch (error) {
          window.alert('Error en la solicitud POST:', error);
        }
      } else {
        window.alert('Creación del polígono cancelada');
      }
    }
  };
  return (
    <div>
      <MapContainer center={[22.711297621247134, -102.05753118812814]} zoom={5} className='mapa' ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          {drawPolygon && (
            <EditControl
              position="topleft"
              draw={{
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
                rectangle: false,
                polygon: true,
                eliminated: false,
              }}
              onCreated={handlePolygonCreated}
            />
          )}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default Mapa;
