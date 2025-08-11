import { useState, useEffect } from 'react';

export default function FuelEfficiencyEditor({ 
  brand, 
  model, 
  efficiency, 
  onEfficiencyChange 
}) {
  const [customEfficiency, setCustomEfficiency] = useState(efficiency);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCustomEfficiency(efficiency);
  }, [brand, model, efficiency]);

  const handleSave = () => {
    if (customEfficiency < 1 || customEfficiency > 30) {
      alert("Por favor ingrese un valor entre 1 y 30 km/l");
      return;
    }
    onEfficiencyChange(parseFloat(customEfficiency));
    setIsEditing(false);
  };

  return (
    <div className="efficiency-editor">
      {!isEditing ? (
        <div className="efficiency-display">
          <div className="efficiency-info">
            <span className="efficiency-label">Eficiencia de combustible:</span>
            <span className="efficiency-value">{efficiency} km/l</span>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="edit-button"
          >
            Personalizar
          </button>
        </div>
      ) : (
        <div className="efficiency-edit">
          <div className="edit-controls">
            <label htmlFor="efficiency-input">Km por litro:</label>
            <input
              id="efficiency-input"
              type="number"
              step="0.1"
              min="1"
              max="30"
              value={customEfficiency}
              onChange={(e) => setCustomEfficiency(e.target.value)}
            />
          </div>
          <div className="edit-actions">
            <button onClick={handleSave} className="save-button">
              Guardar
            </button>
            <button 
              onClick={() => {
                setCustomEfficiency(efficiency);
                setIsEditing(false);
              }}
              className="cancel-button"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}