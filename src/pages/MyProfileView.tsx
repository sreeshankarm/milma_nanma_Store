import React, { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../context/store/store";
import { useTranslation } from "../utils/useTranslation";
import type {
  ContactDetailsFormState,
  GeoLocation,
} from "../types/types";

import ProfileHeader from "../components/MyProfile/ProfileHeader";
import LanguageCard from "../components/MyProfile/LanguageCard";
import ContactDetailsCard from "../components/MyProfile//ContactDetailsCard";
import GeoLocationCard from "../components/MyProfile//GeoLocationCard";
import StorePhotosCard from "../components/MyProfile//StorePhotosCard";

export const MyProfileView: React.FC = () => {
  // const { getUserProfile, updateProfile, updateGeoLocation } = useStore();
  // const profile: UserProfile = getUserProfile();
  const { profile, updateProfile, updateGeoLocation } = useStore();

  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [locationStatus, setLocationStatus] = useState("");

  const [formState, setFormState] = useState<ContactDetailsFormState>({
    phone: profile.phone,
    email: profile.email,
    address: profile.address,
    storePhotos: profile.storePhotos ?? [],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFormState({
      phone: profile.phone,
      email: profile.email,
      address: profile.address,
      storePhotos: profile.storePhotos ?? [],
    });
  }, [profile]);

  const geoLabel = useMemo(() => {
    if (!profile.geoLocation) return t("No GPS fix yet");
    const { lat, lng, accuracy } = profile.geoLocation;
    return `${lat.toFixed(4)}, ${lng.toFixed(4)} • ±${Math.round(accuracy)}m`;
  }, [profile.geoLocation, t]);

  const handleSave = () => {
    setIsSaving(true);
    updateProfile(formState);
    setTimeout(() => {
      setIsSaving(false);
      setStatusMessage(t("Profile updated"));
      setIsEditing(false);
      setTimeout(() => setStatusMessage(""), 2000);
    }, 400);
  };

  const handleGeoUpdate = () => {
    setIsLocating(true);
    setLocationStatus("Fetching current location...");

    const applyLocation = (loc: GeoLocation, label: string) => {
      updateGeoLocation(loc);
      setLocationStatus(label);
      setTimeout(() => setLocationStatus(""), 2500);
      setIsLocating(false);
    };

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        applyLocation(
          {
            lat: +pos.coords.latitude.toFixed(5),
            lng: +pos.coords.longitude.toFixed(5),
            accuracy: Math.round(pos.coords.accuracy),
          },
          "Updated from device GPS"
        ),
      () =>
        applyLocation(
          profile.geoLocation ?? { lat: 9.9699, lng: 76.2999, accuracy: 50 },
          "Using last known location"
        ),
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  return (
    <div className="p-4 pb-24 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProfileHeader
        profile={profile}
        isEditing={isEditing}
        statusMessage={statusMessage}
        onToggleEdit={() => setIsEditing((p) => !p)}
      />
      <LanguageCard />
      <ContactDetailsCard
        profile={profile}
        formState={formState}
        setFormState={setFormState}
        isEditing={isEditing}
        isSaving={isSaving}
        onSave={handleSave}
      />
      <GeoLocationCard
        profile={profile}
        geoLabel={geoLabel}
        isLocating={isLocating}
        locationStatus={locationStatus}
        onUpdate={handleGeoUpdate}
      />
      <StorePhotosCard
        photos={formState.storePhotos}
        setPhotos={(photos: string[]) =>
          setFormState((prev) => ({ ...prev, storePhotos: photos }))
        }
        isEditing={isEditing}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};
