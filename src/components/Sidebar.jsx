import React, { useState, useEffect } from 'react';
import { FaPlus, FaMapMarkerAlt } from 'react-icons/fa';
import './style.css';
import API_BASE_URL from '../config';

const Sidebar = ({ onDrawPolygonClick, updatePolygonsList }) => {
  // Estado local para almacenar los polígonos recuperados
  const [polygons, setPolygons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [forceUpdateKey] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false); // Nuevo estado para manejar el estado de eliminación

  useEffect(() => {
    // Realiza la solicitud GET a la ruta del servicio en Laravel
    fetch(`${API_BASE_URL}/polygons`)
      .then(response => response.json())
      .then(data => {
        // Verifica si hay polígonos en la respuesta
        if (data.polygons && data.polygons.length > 0) {
          setPolygons(data.polygons);
          updatePolygonsList(data.polygons);
        }
      })
      .catch(error => {
        console.error('Error al recuperar polígonos:', error);
      });
    }, [forceUpdateKey, isDeleting, updatePolygonsList]); 

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true); // Bloquea el botón de eliminación al comenzar la solicitud DELETE

      // Realiza la solicitud DELETE al servicio en Laravel
      const response = await fetch(`${API_BASE_URL}/polygon/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Elimina el polígono del estado local
        setPolygons(prevPolygons => prevPolygons.filter(polygon => polygon.id !== id));
        window.alert('Poligono Eliminado Correctamente');
      } else {
        console.error('Error al eliminar el polígono:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE:', error);
    } finally {
      setIsDeleting(false); // Desbloquea el botón de eliminación después de la solicitud DELETE, independientemente del resultado
    }
  };

  // Filtra los polígonos en función del término de búsqueda
  const filteredPolygons = polygons.filter(polygon =>
    polygon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button onClick={onDrawPolygonClick} className="new-field-btn">
        <FaPlus className="icon" /> New Field
      </button>

      {/* Mostrar polígonos si hay alguno, de lo contrario, mostrar solo el botón New Field */}
      {filteredPolygons.length > 0 ? (
        <ul>
          {filteredPolygons.map(polygon => (
            <li key={polygon.id}>
              <div className='field'>
                <span> <FaMapMarkerAlt className="marker-icon" /> Nombre : {polygon.name}</span>
                <br/>
                <span>{polygon.hectareas} hectáreas</span>
                <button
                  className="deleteboton"
                  onClick={() => handleDelete(polygon.id)}
                  disabled={isDeleting} // Deshabilita el botón mientras se está realizando la operación de eliminación
                >
                  {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron polígonos.</p>
      )}
    </div>
  );
};

export default Sidebar;
