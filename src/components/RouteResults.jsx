export default function RouteResults({ routes, fuelPrice }) {
  if (routes.length === 0) {
    return (
      <div className="route-results">
        <div className="empty-state">
          <h3>Resultados de Rutas</h3>
          <p>Seleccione origen, destino y vehículo para calcular las rutas disponibles</p>
          <div className="illustration">🚗💨</div>
        </div>
      </div>
    );
  }

  const bestRoute = routes.reduce((best, current) => 
    parseFloat(current.cost.replace('L ', '')) < parseFloat(best.cost.replace('L ', '')) ? current : best
  );

  return (
    <div className="route-results">
      <h3>Rutas Calculadas</h3>
      
      <div className="fuel-price-info">
        <p>
          <strong>Precio actual del combustible:</strong> L {fuelPrice.toFixed(2)} por litro
        </p>
      </div>
      
      <div className="best-route-banner">
        <div className="best-route-tag">MEJOR OPCIÓN</div>
        <div className="best-route-info">
          <h4>{bestRoute.name}</h4>
          <div className="best-route-details">
            <span>
              <strong>Distancia:</strong> {bestRoute.distance}
            </span>
            <span>
              <strong>Tiempo:</strong> {bestRoute.time}
            </span>
            <span>
              <strong>Combustible:</strong> {bestRoute.liters} L
            </span>
            <span className="best-cost">
              <strong>Costo:</strong> {bestRoute.cost}
            </span>
          </div>
        </div>
      </div>
      
      <div className="routes-comparison">
        {routes.map((route, index) => (
          <div 
            key={index} 
            className={`route-card ${route.name === bestRoute.name ? 'best' : ''}`}
          >
            <h4>{route.name} <span className="traffic-badge">{route.traffic}</span></h4>
            <div className="route-stats">
              <div className="stat">
                <span className="stat-label">Distancia</span>
                <span className="stat-value">{route.distance}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Tiempo estimado</span>
                <span className="stat-value">{route.time}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Eficiencia</span>
                <span className="stat-value">{route.efficiency} km/L</span>
              </div>
              <div className="stat">
                <span className="stat-label">Combustible</span>
                <span className="stat-value">{route.liters} L</span>
              </div>
            </div>
            <div className="route-cost">
              <span>Costo estimado:</span>
              <span className="cost-value">{route.cost}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="route-summary">
        <h4>Resumen del Viaje</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span>Distancia promedio:</span>
            <span>{
              (routes.reduce((sum, route) => 
                sum + parseFloat(route.distance.split(' ')[0]), 0) / routes.length
              ).toFixed(1)
            } km</span>
          </div>
          <div className="summary-item">
            <span>Tiempo promedio:</span>
            <span>{
              (routes.reduce((sum, route) => 
                sum + parseFloat(route.time.split(' ')[0]), 0) / routes.length
              ).toFixed(0)
            } min</span>
          </div>
          <div className="summary-item">
            <span>Combustible total:</span>
            <span>{
              routes.reduce((sum, route) => 
                sum + parseFloat(route.liters), 0
              ).toFixed(2)
            } L</span>
          </div>
          <div className="summary-item">
            <span>Costo total promedio:</span>
            <span>L {
              (routes.reduce((sum, route) => 
                sum + parseFloat(route.cost.replace('L ', '')), 0) / routes.length
              ).toFixed(2)
            }</span>
          </div>
        </div>
      </div>
    </div>
  );
}