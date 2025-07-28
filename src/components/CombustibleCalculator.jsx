// src/components/CombustibleCalculator.jsx
import { useState } from 'react';
import MapSelector from './MapSelector.jsx';
import VehicleSelector from './VehicleSelector.jsx';
import RouteResults from './RouteResults.jsx';
import { vehicleData, fuelPrice } from '../data/vehicleData';

export default function CombustibleCalculator() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [route, setRoute] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState(null);

  const handleEstimate = () => {
    if (origin && destination && brand && model) {
      const distanceKm = 0.5 + Math.random() * 19.5;
      const consumption = vehicleData[brand][model];
      const litersNeeded = distanceKm / consumption;
      const cost = (litersNeeded * fuelPrice).toFixed(3);
      const minutes = Math.round((distanceKm / 30) * 60);
      
      setRoute({
        name: "Ruta simulada",
        time: `${minutes} min`,
        distance: `${distanceKm.toFixed(2)} km`
      });
      setEstimatedCost(`${cost} lps`);
    } else {
      alert("Complete todos los campos");
    }
  };

  return (
    <div className="calculator-container">
      <h2>Estimador de combustible</h2>
      
      <div className="input-section">
        <MapSelector 
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
        />
        <VehicleSelector 
          brand={brand}
          setBrand={setBrand}
          model={model}
          setModel={setModel}
        />
      </div>
      
      <button className="estimate-button" onClick={handleEstimate}>
        Estimar gasto
      </button>
      
      <RouteResults route={route} estimatedCost={estimatedCost} />
    </div>
  );
}