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
      <div className="brand-selector">
        <label htmlFor="brand-search">Marca del vehículo</label>
        <input
          id="brand-search"
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
          size="5"
        >
          <option value="">Seleccione una marca</option>
          {filteredBrands.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      
      {brand && (
        <div className="model-selector">
          <label htmlFor="model-search">Modelo del vehículo</label>
          <input
            id="model-search"
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
            size="5"
          >
            <option value="">Seleccione un modelo</option>
            {filteredModels.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}