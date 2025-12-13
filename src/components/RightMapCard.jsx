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
    // Helps when the map is mounted inside a resized/flex container.
    setTimeout(() => map.invalidateSize(), 0);
  }, [map]);
  return null;
}

function RightMapCard() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full h-3/6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl p-6 flex flex-col">
        <div className="text-slate-600 text-xs tracking-widest uppercase shrink-0">
          Situated at
        </div>

        {/* “slot” like the left card center area */}
        <div className="mt-4 rounded-2xl border border-slate-200 overflow-hidden h-24 sm:h-28 md:h-32 shrink-0">
          <MapContainer
            center={[LAT, LNG]}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <FixLeafletSize />
            <TileLayer
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              subdomains={["a", "b", "c", "d"]}
            />
          </MapContainer>
        </div>

        {/* optional spacer like left card */}
        <div className="flex-1 min-h-0" />

        <div className="mt-2 text-sm tracking-widest text-slate-700 shrink-0">
          Mumbai, India
        </div>
      </div>
    </div>
  );
}

export default RightMapCard;
