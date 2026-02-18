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

// === FIX ICONOS QUE TE FUNCIONABA (mantenido exactamente) ===
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.imagePath = "";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src || markerIcon,
  iconRetinaUrl: markerIconRetina.src || markerIconRetina,
  shadowUrl: markerShadow.src || markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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
  const [mapCenter] = useState([43.417, -8.068]); // Centro real de la ruta

  // Ruta mucho más realista (muestra los giros y curvas del GPX)
  const routePoints = [
    [43.405356, -8.048852],
    [43.405271, -8.048859],
    [43.404955, -8.049645],
    [43.404691, -8.050564],
    [43.404769, -8.051198],
    [43.405146, -8.051677],
    [43.406203, -8.052507],
    [43.406823, -8.052729],
    [43.407341, -8.053114],
    [43.408062, -8.053244],
    [43.408173, -8.053804],
    [43.408555, -8.054127],
    [43.409432, -8.055231],
    [43.410108, -8.055799],
    [43.410302, -8.05589],
    [43.410727, -8.055577],
    [43.411214, -8.054624],
    [43.411431, -8.055192],
    [43.411571, -8.056006],
    [43.41178, -8.056414],
    [43.412197, -8.0566],
    [43.412465, -8.056422],
    [43.412899, -8.056316],
    [43.412526, -8.057848],
    [43.412698, -8.058668],
    [43.412623, -8.059108],
    [43.412703, -8.059894],
    [43.413217, -8.061542],
    [43.413468, -8.061964],
    [43.413769, -8.062203],
    [43.413922, -8.062182],
    [43.414318, -8.061801],
    [43.414419, -8.062694],
    [43.414657, -8.063094],
    [43.416221, -8.064319],
    [43.416539, -8.064745],
    [43.416855, -8.064916],
    [43.417436, -8.065803],
    [43.41768, -8.066502],
    [43.417688, -8.067855],
    [43.417541, -8.068577],
    [43.41767, -8.068649],
    [43.417553, -8.068601],
    [43.417647, -8.068749],
    [43.417567, -8.068914],
    [43.417706, -8.068866],
    [43.417604, -8.068773],
    [43.417587, -8.068406],
    [43.417603, -8.067955],
    [43.417739, -8.067595],
    [43.417922, -8.067384],
    [43.418602, -8.067361],
    [43.418734, -8.067194],
    [43.418776, -8.06682],
    [43.418881, -8.066998],
    [43.41882, -8.067158],
    [43.418793, -8.066913],
    [43.418745, -8.067098],
    [43.418708, -8.066985],
    [43.418745, -8.067154],
    [43.418649, -8.067184],
    [43.418779, -8.067276],
    [43.418441, -8.068105],
    [43.418377, -8.069971],
    [43.418219, -8.070218],
    [43.418152, -8.069833],
    [43.417949, -8.069723],
    [43.417684, -8.070234],
    [43.416889, -8.070265],
    [43.416534, -8.069924],
    [43.416315, -8.070178],
    [43.416262, -8.070077],
    [43.416134, -8.070153],
    [43.415976, -8.070099],
    [43.414915, -8.072087],
    [43.414405, -8.073506],
    [43.413424, -8.074826],
    [43.413166, -8.07502],
    [43.413019, -8.075302],
    [43.412957, -8.075849],
    [43.412421, -8.076395],
    [43.412365, -8.076836],
    [43.412349, -8.076775],
    [43.412162, -8.077015],
    [43.412073, -8.077272],
    [43.41193, -8.077296],
    [43.411583, -8.077687],
    [43.411444, -8.077961],
    [43.410864, -8.08052],
    [43.410759, -8.080436],
    [43.410878, -8.080521],
    [43.410865, -8.08085],
    [43.410537, -8.081649],
    [43.410248, -8.0818],
    [43.409833, -8.082294],
    [43.40918, -8.082581],
    [43.408668, -8.083231],
    [43.408462, -8.0831],
    [43.408535, -8.082689],
    [43.409011, -8.082092],
    [43.40996, -8.081391],
    [43.410416, -8.080726],
    [43.410346, -8.080552],
    [43.410477, -8.079869],
    [43.411129, -8.07805],
    [43.41171, -8.076994],
    [43.411897, -8.076294],
    [43.412214, -8.075658],
    [43.413501, -8.074192],
    [43.414318, -8.073068],
    [43.414551, -8.072297],
    [43.41524, -8.070834],
    [43.416186, -8.069225],
    [43.416578, -8.06808],
    [43.416567, -8.067509],
    [43.41621, -8.066217],
    [43.415633, -8.065552],
    [43.415237, -8.065441],
    [43.415087, -8.065282],
    [43.414701, -8.065254],
    [43.414575, -8.065116],
    [43.414424, -8.065239],
    [43.414157, -8.065096],
    [43.41349, -8.064511],
    [43.41321, -8.064037],
    [43.413014, -8.063926],
    [43.412221, -8.062684],
    [43.411824, -8.061693],
    [43.411717, -8.061171],
    [43.411337, -8.06041],
    [43.41134, -8.059749],
    [43.411205, -8.059289],
    [43.41016, -8.057951],
    [43.406907, -8.055327],
    [43.405015, -8.054544],
    [43.404769, -8.054345],
    [43.403871, -8.054057],
    [43.403312, -8.053452],
    [43.403238, -8.053085],
    [43.402753, -8.052346],
    [43.402587, -8.050964],
    [43.402891, -8.050462],
    [43.402762, -8.050405],
    [43.402747, -8.050288],
    [43.402791, -8.050447],
    [43.40294, -8.05046],
    [43.40299, -8.050134],
    [43.402919, -8.049963],
    [43.402977, -8.049726],
    [43.402865, -8.049867],
    [43.402715, -8.049769],
    [43.402846, -8.049704],
    [43.403492, -8.048452],
    [43.403458, -8.04808],
    [43.403628, -8.047668],
    [43.404649, -8.047156],
    [43.404898, -8.046833],
    [43.405098, -8.046799],
    [43.405246, -8.046647],
    [43.405213, -8.046383],
    [43.405374, -8.046235],
    [43.405527, -8.045274],
    [43.405961, -8.04519],
    [43.406154, -8.044946],
    [43.405871, -8.044284],
    [43.405822, -8.042971],
    [43.406158, -8.041132],
    [43.406349, -8.040811],
    [43.406632, -8.040961],
    [43.40656, -8.040725],
    [43.406749, -8.04045],
    [43.406573, -8.040657],
    [43.406629, -8.040968],
    [43.406433, -8.043112],
    [43.406517, -8.043737],
    [43.406495, -8.046569],
    [43.406277, -8.047354],
    [43.406011, -8.047648],
    [43.405711, -8.048339],
    [43.405344, -8.048689],
    [43.405339, -8.048891],
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.warn("Geolocalización error:", err),
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
        zoom={15}
        style={{ height: "420px", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        {/* Vista satélite con vegetación (como Wikiloc) */}
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Ruta mucho más realista */}
        <Polyline
          positions={routePoints}
          color="#f97316"
          weight={5}
          opacity={0.85}
        >
          <Popup>Ruta real extraída del GPX de Wikiloc</Popup>
        </Polyline>

        {/* Marcadores con nombres (los que tenías + algunos más) */}
        {[
          {
            pos: [43.405356, -8.048852],
            label: "Inicio - Central da Ventureira",
          },
          { pos: [43.41768, -8.0665], label: "Monasterio de Caaveiro" },
          { pos: [43.418763, -8.066992], label: "Restos de Molino" },
          { pos: [43.418859, -8.066981], label: "Río Sesín" },
          { pos: [43.416253, -8.070073], label: "Unión Ríos Sesín y Eume" },
          { pos: [43.412967, -8.075784], label: "Subida con Cuerdas" },
          { pos: [43.408567, -8.083184], label: "Ponte Colgante de Fornelos" },
          { pos: [43.410343, -8.080821], label: "Área Recreativa" },
        ].map((marker, index) => (
          <Marker key={index} position={marker.pos}>
            <Popup>
              <strong>{marker.label}</strong>
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
