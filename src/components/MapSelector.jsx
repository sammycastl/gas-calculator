import { useState, useEffect } from 'react';
import { tegucigalpaLocations, locationCategories } from '../data/vehicleData';

export default function MapSelector({ origin, setOrigin, destination, setDestination }) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [activeField, setActiveField] = useState('origin');
  const [showMap, setShowMap] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (searchInput.length > 0) {
      const results = tegucigalpaLocations.filter(loc =>
        loc.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredLocations(results.slice(0, 5));
    } else if (activeCategory) {
      const categoryKeywords = locationCategories[activeCategory];
      const results = tegucigalpaLocations.filter(loc =>
        categoryKeywords.some(keyword => 
          loc.name.split(' ').some(word => 
            keyword.toLowerCase() === word.toLowerCase()
          )
        )
      );
      setFilteredLocations(results);
    } else {
      setFilteredLocations([]);
    }
  }, [searchInput, activeCategory]);

  const handleLocationSelect = (location) => {
    if (activeField === 'origin') {
      setOrigin(location);
    } else {
      setDestination(location);
    }
    setSearchInput('');
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const clearSelection = () => {
    if (activeField === 'origin') {
      setOrigin(null);
    } else {
      setDestination(null);
    }
  };

  return (
    <div className="location-selector">
      <div className="location-fields">
        <div className={`location-input ${activeField === 'origin' ? 'active' : ''}`}>
          <label>Origen</label>
          <div className="input-container">
            <input
              type="text"
              value={origin?.name || ''}
              placeholder="Seleccionar origen"
              readOnly
              onClick={() => setActiveField('origin')}
            />
            {origin && (
              <button className="clear-button" onClick={clearSelection}>
                ×
              </button>
            )}
          </div>
        </div>
        
        <button className="swap-button" onClick={swapLocations} title="Intercambiar">
          ↔
        </button>
        
        <div className={`location-input ${activeField === 'destination' ? 'active' : ''}`}>
          <label>Destino</label>
          <div className="input-container">
            <input
              type="text"
              value={destination?.name || ''}
              placeholder="Seleccionar destino"
              readOnly
              onClick={() => setActiveField('destination')}
            />
            {destination && (
              <button className="clear-button" onClick={clearSelection}>
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setActiveCategory(null);
            }}
            placeholder={`Buscar ${activeField === 'origin' ? 'origen' : 'destino'}...`}
          />
        </div>
        
     
      </div>

      <div className="category-filters">
        {Object.keys(locationCategories).map(category => (
          <button
            key={category}
            className={`category-tag ${activeCategory === category ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(activeCategory === category ? null : category);
              setSearchInput('');
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {showMap && (
        <div className="map-visual">
          <div className="map-grid">
            {tegucigalpaLocations.slice(0, 16).map(loc => (
              <div 
                key={`${loc.name}-${loc.coords}`}
                className={`map-point ${
                  origin?.name === loc.name ? 'origin' : 
                  destination?.name === loc.name ? 'destination' : ''
                }`}
                onClick={() => handleLocationSelect(loc)}
                title={loc.name}
              >
                {loc.type.charAt(0)}
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredLocations.length > 0 && (
        <div className="location-results">
          {filteredLocations.map(location => (
            <div
              key={`${location.name}-${location.coords}`}
              className="location-item"
              onClick={() => handleLocationSelect(location)}
            >
              <div className="location-name">{location.name}</div>
              <div className="location-details">
                <span className="location-type">{location.type}</span>
                <span className="location-coords">{location.coords}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}