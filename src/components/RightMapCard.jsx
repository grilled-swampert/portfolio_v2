import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEffect } from "react";

// Fix default marker icon paths (common in bundlers)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LAT = 19.056194;
const LNG = 72.868984;

function FixLeafletSize() {
  const map = useMap();
  useEffect(() => {
    // Helps when the map is mounted inside a resized/flex container [web:33][web:34]
    setTimeout(() => map.invalidateSize(), 0);
  }, [map]);
  return null;
}

function RightMapCard() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full h-full min-h-[280px] sm:min-h-[320px] rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 shadow-lg sm:shadow-xl p-4 sm:p-6 flex flex-col">
        {/* Header - Responsive Typography */}
        <div className="text-slate-600 text-xs sm:text-xs tracking-wide sm:tracking-widest uppercase shrink-0">
          Situated at
        </div>

        {/* Map Container - Responsive Height [web:31][web:36] */}
        <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden h-32 sm:h-36 md:h-40 lg:h-48 shrink-0">
          <MapContainer
            center={[LAT, LNG]}
            zoom={13}
            scrollWheelZoom={false}
            dragging={window.innerWidth > 640} // Disable dragging on mobile [web:31]
            tap={window.innerWidth <= 640} // Enable tap for mobile [web:31]
            touchZoom={true}
            doubleClickZoom={false}
            className="h-full w-full"
            style={{ minHeight: '100%' }}
          >
            <FixLeafletSize />
            <TileLayer
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              subdomains={["a", "b", "c", "d"]}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
          </MapContainer>
        </div>

        {/* Flexible spacer */}

        {/* Location Label - Responsive Typography */}
        <div className="mt-3 sm:mt-2 text-xs sm:text-sm tracking-wide sm:tracking-widest text-slate-700 shrink-0">
          Mumbai, India
        </div>
      </div>
    </div>
  );
}

export default RightMapCard;
