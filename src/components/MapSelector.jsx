// src/components/MapSelector.jsx
import { useState } from 'react';
import { tegucigalpaLocations } from '../data/vehicleData';

export default function MapSelector({ origin, setOrigin, destination, setDestination }) {
  const [mapMode, setMapMode] = useState('origin');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLocationClick = (location) => {
    if (mapMode === 'origin') {
      setOrigin(`${location.name} (${location.coords})`);
    } else {
      setDestination(`${location.name} (${location.coords})`);
    }
  };

  const filteredLocations = tegucigalpaLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="map-selector">
      <div className="input-group">
        <label htmlFor="origin">Origen</label>
        <input 
          type="text" 
          id="origin" 
          value={origin || ''} 
          placeholder="Seleccione origen en el mapa" 
          readOnly
          onClick={() => setMapMode('origin')}
          className={mapMode === 'origin' ? 'active' : ''}
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="destination">Destino</label>
        <input 
          type="text" 
          id="destination" 
          value={destination || ''} 
          placeholder="Seleccione destino en el mapa" 
          readOnly
          onClick={() => setMapMode('destination')}
          className={mapMode === 'destination' ? 'active' : ''}
        />
      </div>
      
      <div className="map-placeholder">
        <h4>Seleccione {mapMode === 'origin' ? 'origen' : 'destino'} en el mapa</h4>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="location-buttons">
          {filteredLocations.map(location => (
            <button 
              key={`${location.name}-${location.coords}`}
              onClick={() => handleLocationClick(location)}
              className="location-button"
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}