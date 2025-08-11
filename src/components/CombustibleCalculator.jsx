import { useState, useEffect } from 'react';
import MapSelector from './MapSelector';
import VehicleSelector from './VehicleSelector';
import RouteResults from './RouteResults';
import FuelEfficiencyEditor from './FuelEfficiencyEditor';
import { vehicleData, fuelPrice, tegucigalpaLocations } from '../data/vehicleData';

export default function CombustibleCalculator() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [customEfficiency, setCustomEfficiency] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const currentEfficiency = customEfficiency || 
    (brand && model ? vehicleData[brand][model] : null);

  const calculateRoutes = () => {
    if (!origin || !destination || !brand || !model || !currentEfficiency) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {

      const distanceKm = calculateRealDistance(origin.coords, destination.coords);

      const routeTypes = [
        { 
          name: "Ruta Principal", 
          traffic: "Alto",
          speedFactor: 1.3, 
          trafficFactor: 1.2 
        },
        { 
          name: "Ruta Económica", 
          traffic: "Bajo",
          speedFactor: 0.9,  
          trafficFactor: 0.8
        },
        { 
          name: "Ruta Alternativa", 
          traffic: "Moderado",
          speedFactor: 1.1,  
          trafficFactor: 1.0
        }
      ];
      
      const calculatedRoutes = routeTypes.map(route => {

        const adjustedDistance = distanceKm * route.speedFactor;
        
        const litersNeeded = (adjustedDistance / currentEfficiency) * route.trafficFactor;
        
        const cost = litersNeeded * fuelPrice;
        
        const avgSpeed = route.traffic === "Alto" ? 30 : route.traffic === "Bajo" ? 50 : 40;
        const timeHours = adjustedDistance / avgSpeed;
        const minutes = Math.round(timeHours * 60);
        
        return {
          ...route,
          distance: adjustedDistance,
          originalDistance: distanceKm,
          time: minutes,
          liters: litersNeeded,
          cost: cost
        };
      });
      
      // Formatear resultados para mostrar
      const formattedRoutes = calculatedRoutes.map(route => ({
        ...route,
        distance: `${route.distance.toFixed(1)} km`,
        time: `${route.time} min`,
        cost: `L ${route.cost.toFixed(2)}`,
        liters: route.liters.toFixed(2),
        efficiency: currentEfficiency
      }));
      
      setRoutes(formattedRoutes);
      setIsCalculating(false);
    }, 1500);
  };

  const calculateRealDistance = (coords1, coords2) => {
    const [lat1, lon1] = coords1.split(',').map(coord => parseFloat(coord.trim()));
    const [lat2, lon2] = coords2.split(',').map(coord => parseFloat(coord.trim()));
    
    const R = 6371; 
    const dLat = (2*(lat2 - lat1) * Math.PI / 180);
    const dLon = (2*(lon2 - lon1) * Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const distance = R * c * 1.3;
    
    return Math.min(Math.max(distance, 1), 50);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h2>Fuel Saver</h2>
        <p>Seleccione origen, destino y vehículo para calcular las rutas óptimas</p>
      </div>
      
      <div className="input-sections">
        <MapSelector 
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
        />
        
        <div className="vehicle-section">
          <VehicleSelector 
            brand={brand}
            setBrand={setBrand}
            model={model}
            setModel={setModel}
          />
          
          {brand && model && (
            <FuelEfficiencyEditor
              brand={brand}
              model={model}
              efficiency={vehicleData[brand][model]}
              onEfficiencyChange={setCustomEfficiency}
            />
          )}
        </div>
      </div>
      
      <div className="actions">
        <button 
          className={`calculate-button ${isCalculating ? 'calculating' : ''}`}
          onClick={calculateRoutes}
          disabled={!origin || !destination || !brand || !model || isCalculating}
        >
          {isCalculating ? (
            <>
              <span className="spinner"></span>
              Calculando...
            </>
          ) : (
            'Calcular Rutas'
          )}
        </button>
      </div>
      
      <RouteResults routes={routes} fuelPrice={fuelPrice} />
    </div>
  );
}