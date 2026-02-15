import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

// Importa imágenes explícitamente (Vite las bundea correctamente)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Sobrescribe iconos default de Leaflet (el fix principal)
delete L.Icon.Default.prototype._getIconUrl;

// Merge options con paths importados (usa .src para Vite/Astro)
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Condicional extra para dev (algunos casos en Astro lo necesitan)
if (import.meta.env.DEV) {
  L.Icon.Default.imagePath = ""; // Evita concatenación mala en dev
}

function LocationMarker({ onLocationChange }) {
  useMapEvents({
    locationfound(e) {
      onLocationChange(e.latlng);
    },
  });
  return null;
}

export default function MapaRuta() {
  const [position, setPosition] = useState(null);
  const [mapCenter] = useState([43.44, -8.12]); // Centro Fragas do Eume

  // Puntos clave de la ruta Wikiloc (actualizados)
  const routePoints = [
    [43.428, -8.128], // Inicio: Central da Ventureira
    [43.43, -8.125], // Vistas lejanas al Monasterio
    [43.435, -8.12], // Puente Medieval + Ruinas Molino (Río Sesín)
    [43.438, -8.118], // Unión Ríos Sesín y Eume
    [43.445, -8.115], // Monasterio de Caaveiro
    [43.448, -8.112], // Tramo con cuerdas
    [43.45, -8.11], // Ponte Colgante de Fornelos
    [43.452, -8.108], // Área recreativa junto al Eume
    [43.428, -8.128], // Regreso
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => console.warn("Error geolocalización:", err),
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
      <p className="text-sm text-gray-600 mb-4 text-center">
        Activa la geolocalización para ver tu posición en tiempo real. Ruta
        circular ~11.4 km.
      </p>

      <MapContainer
        center={mapCenter}
        zoom={14}
        style={{ height: "400px", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={routePoints}
          color="green"
          weight={4}
          opacity={0.7}
        >
          <Popup>Ruta completa basada en Wikiloc ID 41252823</Popup>
        </Polyline>

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

        {position && (
          <Marker position={position}>
            <Popup>Tu posición actual (actualiza en tiempo real)</Popup>
          </Marker>
        )}

        <LocationMarker onLocationChange={setPosition} />
      </MapContainer>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Geolocalización solo en esta página. Permiso requerido por el navegador.
      </p>
    </div>
  );
}
