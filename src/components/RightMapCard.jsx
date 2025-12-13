import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

function RightMapCard() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[340px] rounded-3xl bg-slate-50 border border-slate-200 shadow-xl p-6">
        <div className="text-slate-600 text-xs tracking-widest uppercase">
          Situated at
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <div className="w-full aspect-video">
            <MapContainer
              center={[LAT, LNG]}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                subdomains={["a", "b", "c", "d"]}
              />
            </MapContainer>
          </div>
        </div>
        <div className="mt-2 text-sm tracking-widest text-slate-700">
          Mumbai, India
        </div>
      </div>
    </div>
  );
}

export default RightMapCard;
