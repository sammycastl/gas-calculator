// src/components/VehicleSelector.jsx
import { useState } from 'react';
import { vehicleData } from '../data/vehicleData';

export default function VehicleSelector({ brand, setBrand, model, setModel }) {
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');

  const filteredBrands = Object.keys(vehicleData).filter(b =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredModels = brand && vehicleData[brand]
    ? Object.keys(vehicleData[brand]).filter(m =>
        m.toLowerCase().includes(modelSearch.toLowerCase())
      )
    : [];

  return (
    <div className="vehicle-selector">
      <div className="input-group">
        <label htmlFor="brand">Marca</label>
        <input
          type="text"
          placeholder="Buscar marca..."
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
        />
        <select 
          id="brand" 
          value={brand} 
          onChange={(e) => {
            setBrand(e.target.value);
            setModel('');
            setModelSearch('');
          }}
        >
          <option value="">Seleccione marca</option>
          {filteredBrands.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      
      <div className="input-group">
        <label htmlFor="model">Modelo</label>
        {brand && (
          <>
            <input
              type="text"
              placeholder="Buscar modelo..."
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
              disabled={!brand}
            />
            <select 
              id="model" 
              value={model} 
              onChange={(e) => setModel(e.target.value)}
              disabled={!brand || filteredModels.length === 0}
            >
              <option value="">Seleccione modelo</option>
              {filteredModels.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </>
        )}
      </div>
      
      {model && (
        <div className="vehicle-info">
          <p>Consumo estimado: {vehicleData[brand][model]} km/l</p>
          <p className="vehicle-year">Aprox. {getVehicleYear(model)}</p>
        </div>
      )}
    </div>
  );
}


function getVehicleYear(modelName) {
  const yearMatch = modelName.match(/\d{4}/);
  return yearMatch ? `Modelo ${yearMatch[0]}` : "Modelo reciente";
}