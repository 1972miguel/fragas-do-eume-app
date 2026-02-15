import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

// Hook para eventos del mapa (geolocalización)
function LocationMarker({ onLocationChange }) {
  useMapEvents({
    locationfound(e) {
      onLocationChange(e.latlng);
    },
  });
  return null;
}

export default function MapaRuta() {
  const [position, setPosition] = useState(null); // Posición actual del usuario
  const [mapCenter, setMapCenter] = useState([43.45, -8.05]); // Centro inicial: Fragas do Eume

  // Puntos de la ruta (coords reales aproximadas de la Ruta dos Encomendeiros)
  const routePoints = [
    [43.428, -8.128], // Inicio: Central da Ventureira / zona parking (cerca Centro Interpretación)
    [43.43, -8.125], // Vistas lejanas al Monasterio
    [43.435, -8.12], // Puente Medieval y Ruinas Molino (Río Sesín)
    [43.438, -8.118], // Unión Ríos Sesín y Eume
    [43.445, -8.115], // Monasterio de Caaveiro (principal)
    [43.448, -8.112], // Tramo con cuerdas (subida aproximada)
    [43.45, -8.11], // Ponte Colgante de Fornelos
    [43.452, -8.108], // Área recreativa junto al Eume
    [43.428, -8.128], // Regreso al inicio (cierre circular)
  ];

  useEffect(() => {
    // Pide permiso y obtiene posición inicial
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setMapCenter([latitude, longitude]); // Centra el mapa en el usuario
        },
        (err) => {
          console.warn("Geolocalización no disponible:", err.message);
          // Fallback: usa el centro de la ruta
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      );

      // Watch para posición en tiempo real (actualiza cada 5s)
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => console.warn("Error en watchPosition:", err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 },
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h3 className="text-xl font-semibold mb-4 text-green-800 text-center">
        Mapa interactivo de la ruta
      </h3>
      <p class="text-sm text-gray-600 mb-4 text-center">
        Activa la geolocalización para ver tu posición en tiempo real. Ruta
        aproximada: 12 km circular.
      </p>

      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        {/* Capa de tiles (OpenStreetMap, gratis y ligera) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Línea de la ruta (polilínea) */}
        <Polyline
          positions={routePoints}
          color="green"
          weight={4}
          opacity={0.7}
        >
          <Popup>Ruta principal: Sigue los senderos marcados</Popup>
        </Polyline>

        {/* Marcadores de puntos clave */}
        {routePoints.slice(0, -1).map((point, index) => (
          <Marker key={index} position={point}>
            <Popup>
              {index === 0 && "Inicio: Central da Ventureira (parking)"}
              {index === 1 && "Vistas lejanas al Monasterio"}
              {index === 2 && "Puente Medieval + Ruinas Molino (Río Sesín)"}
              {index === 3 && "Unión Ríos Sesín y Eume"}
              {index === 4 && "Monasterio de Caaveiro – visita principal"}
              {index === 5 && "Tramo con cuerdas (precaución)"}
              {index === 6 && "Ponte Colgante de Fornelos"}
              {index === 7 && "Área recreativa con vistas al Eume"}
            </Popup>
          </Marker>
        ))}

        {/* Marker de posición actual del usuario */}
        {position && (
          <Marker
            position={position}
            icon={L.divIcon({
              className: "user-marker",
              html: "📍 Tú estás aquí",
            })}
          >
            <Popup>Tu posición actual (actualiza en tiempo real)</Popup>
          </Marker>
        )}

        {/* Hook para geolocalización */}
        <LocationMarker onLocationChange={setPosition} />
      </MapContainer>

      {/* Nota de privacidad */}
      <p className="text-xs text-gray-500 mt-2 text-center">
        Geolocalización solo en esta página. Permiso requerido por el navegador.
      </p>
    </div>
  );
}
