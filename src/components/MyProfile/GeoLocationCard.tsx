import { Compass, Navigation2 } from "lucide-react";
// import type { UserProfile } from "../../typesss/typesss";
import type { UserProfile } from "../../types/profile";


interface GeoLocationCardProps {
  profile: UserProfile | null;
  geoLabel?: string;
  isLocating: boolean;
  locationStatus: string;
  onUpdate?: () => void;
}

const GeoLocationCard: React.FC<GeoLocationCardProps> = ({
  // profile,
  geoLabel,
  isLocating,
  locationStatus,
  onUpdate,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 p-4 space-y-3">
      <div className="flex justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Compass size={16} /> Delivery geolocation
        </h3>

        {locationStatus && (
          <span className="text-xs text-blue-500">
            {locationStatus}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500">{geoLabel}</p>

      <button
        onClick={onUpdate}
        disabled={isLocating}
        className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center gap-2 disabled:opacity-60"
      >
        <Navigation2 size={16} />
        {isLocating ? "Updating..." : "Update geolocation"}
      </button>
    </div>
  );
};

export default GeoLocationCard;
