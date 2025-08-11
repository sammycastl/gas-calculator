export const vehicleData = {
  Honda: {
    'Civic': 12.5,
    'Accord': 10.8,
    'CR-V': 9.3,
    'Pilot': 16.5,
    'HR-V': 12.8,
    'Fit': 15.0
  },
  Toyota: {
    'Corolla': 13.2,
    'Corolla Cross': 11.8,
    'Camry': 11.5,
    'RAV4': 14.8,
    'Hilux': 9.0,
    'Fortuner': 15.5,
    'Yaris': 12.5
  },
  Mitsubishi: {
    'Lancer': 11.8,
    'Outlander': 9.5,
    'Pajero': 7.8,
    'Montero': 7.2,
    'ASX': 10.2,
    'Eclipse Cross': 9.8
  },
  Daihatsu: {
    'Terios': 10.5,
    'Mira': 14.0,
    'Sirion': 12.8,
    'Charade': 13.5,
    'Bego': 8.5,
    'Gran Max': 9.2
  },
  Ford: {
    'Fiesta': 12.0,
    'Focus': 11.2,
    'Escape': 9.0,
    'Ranger': 7.5,
    'Explorer': 6.8,
    'Edge': 8.2
  },
  Hyundai: {
    'Tucson': 9.5,
    'Santa Fe': 8.8,
    'Elantra': 12.5,
    'Accent': 12.2,
    'Creta': 10.5
  },
  Kia: {
    'Sportage': 13.2,
    'Sorento': 13.5,
    'Rio': 9.5,
    'Picanto': 8.0,
    'Stonic': 11.8
  },
  Nissan: {
    'Sentra': 12.0,
    'Versa': 12.8,
    'X-Trail': 9.0,
    'Kicks': 10.2,
    'Frontier': 7.8
  },
  Volkswagen: {
    'Golf': 13.0,
    'Jetta': 12.5,
    'Tiguan': 9.5,
    'Amarok': 8.0
  },
  Chevrolet: {
    'Spark': 7.5,
    'Aveo': 13.0,
    'Cruze': 11.5,
    'Trailblazer': 7.8
  }
};

export const fuelPrice = 100;

export const tegucigalpaLocations = [
  // Universidades
  { name: "UNAH Ciudad Universitaria", coords: "14.0899, -87.2060", type: "Universidad" },
  { name: "Universidad Tecnológica Centroamericana (UNITEC)", coords: "14.0833, -87.1786", type: "Universidad" },
  { name: "Universidad Pedagógica Nacional", coords: "14.0865, -87.1920", type: "Universidad" },
  
  // Centros Comerciales
  { name: "Mall Multiplaza Tegucigalpa", coords: "14.0716, -87.1818", type: "Centro Comercial" },
  { name: "Plaza Miraflores", coords: "14.0798, -87.1750", type: "Centro Comercial" },
  { name: "Centro Comercial Galerías", coords: "14.0675, -87.1960", type: "Centro Comercial" },
  { name: "Plaza Las Américas", coords: "14.0630, -87.1850", type: "Centro Comercial" },
  
  // Hospitales
  { name: "Hospital Escuela Universitario", coords: "14.0825, -87.1894", type: "Hospital" },
  { name: "Hospital San Felipe", coords: "14.0920, -87.2010", type: "Hospital" },
  { name: "Hospital Militar", coords: "14.0780, -87.2030", type: "Hospital" },
  
  // Puntos Turísticos
  { name: "Parque La Leona", coords: "14.0923, -87.1937", type: "Turístico" },
  { name: "Museo para la Identidad Nacional", coords: "14.0945, -87.1928", type: "Turístico" },
  { name: "Casa Presidencial", coords: "14.0920, -87.2060", type: "Turístico" },
  
  // Transporte
  { name: "Aeropuerto Toncontín", coords: "14.0609, -87.2175", type: "Transporte" },
  { name: "Terminal de buses El Hatillo", coords: "14.1030, -87.1880", type: "Transporte" },
  { name: "Terminal Metropolitana", coords: "14.0720, -87.2130", type: "Transporte" },
  
  // Barrios importantes
  { name: "Colonia Palmira", coords: "14.1005, -87.1950", type: "Residencial" },
  { name: "Colonia Las Minitas", coords: "14.0850, -87.2000", type: "Residencial" },
  { name: "Colonia Loarque", coords: "14.0650, -87.1900", type: "Residencial" },
  
  // Gobierno
  { name: "Congreso Nacional", coords: "14.0940, -87.2035", type: "Gobierno" },
  { name: "Alcaldía Municipal", coords: "14.0970, -87.1980", type: "Gobierno" },
  
  // Otros
  { name: "Estadio Nacional Chelato Uclés", coords: "14.0660, -87.2030", type: "Deportivo" },
  { name: "Centro Cultural España", coords: "14.0975, -87.1940", type: "Cultural" },
  { name: "Cementerio General", coords: "14.0730, -87.2000", type: "Otro" },
  { name: "Zona Viva", coords: "14.0950, -87.1800", type: "Entretenimiento" }
];

export const locationCategories = {
  "Universidades": ["UNAH", "Universidad"],
  "Centros Comerciales": ["Mall", "Plaza", "Galerías"],
  "Hospitales": ["Hospital", "Clínica"],
  "Puntos Turísticos": ["Parque", "Museo", "Casa Presidencial"],
  "Transporte": ["Aeropuerto", "Terminal"],
  "Barrios": ["Colonia"],
  "Gobierno": ["Congreso", "Alcaldía"],
  "Otros": ["Estadio", "Cementerio", "Zona Viva"]
};