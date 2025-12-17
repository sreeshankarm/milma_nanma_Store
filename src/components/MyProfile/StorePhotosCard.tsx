import { Image, Trash2, Upload } from "lucide-react";
import type { RefObject } from "react";

interface StorePhotosCardProps {
  photos: string[];
  setPhotos: (photos: string[]) => void; // ✅ FIX
  isEditing: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>; // ✅ FIX
}

const StorePhotosCard: React.FC<StorePhotosCardProps> = ({
  photos,
  setPhotos,
  isEditing,
  fileInputRef,
}) => {
  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-300 p-4 space-y-4">
      <h3 className="font-semibold flex items-center gap-2">
        <Image size={16} /> Storefront photos
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {photos.map((p, i) => (
          <div key={i} className="relative">
            <img
              src={p}
              alt="Store"
              className="rounded-xl object-cover aspect-square"
            />

            {isEditing && (
              <button
                onClick={() => removePhoto(i)}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-gray-900 text-white py-3 rounded-xl flex justify-center gap-2"
          >
            <Upload size={16} /> Add photos
          </button>
        </>
      )}
    </div>
  );
};

export default StorePhotosCard;
