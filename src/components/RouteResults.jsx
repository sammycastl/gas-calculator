// src/components/RouteResults.jsx
import { fuelPrice } from '../data/vehicleData';

export default function RouteResults({ route, estimatedCost }) {
  return (
    <div className="route-results">
      <h3>Rutas Disponibles</h3>
      
      {route ? (
        <div className="route-info">
          <p><strong>{route.name}</strong>: {route.time} - {route.distance}</p>
          <div className="consumption-details">
            <p>Gasto estimado: <span className="estimated-cost">{estimatedCost}</span></p>
            <p className="disclaimer">* Basado en precio simulado de combustible (L {fuelPrice.toFixed(2)}/litro)</p>
          </div>
        </div>
      ) : (
        <p>Seleccione origen, destino y vehículo para calcular la ruta</p>
      )}
    </div>
  );
}