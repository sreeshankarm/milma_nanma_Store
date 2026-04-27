import React, { useEffect, useState } from "react";

import ProfileHeader from "../components/MyProfile/ProfileHeader";
// import LanguageCard from "../components/MyProfile/LanguageCard";
import ContactDetailsCard from "../components/MyProfile//ContactDetailsCard";

import { useAuth } from "../context/auth/useAuth";
import { useProfile } from "../context/profile/useProfile";
// import type { ContactDetailsFormState } from "../types/profile";
import ChangePassword from "../components/MyProfile/ChangePassword";
import GeoLocationCard from "../components/MyProfile/GeoLocationCard";
import UpdateLocationModal from "../components/MyProfile/UpdateLocationModal";
import { saveAgentLocationApi } from "../api/profile.api";

import { toast } from "react-toastify";

export const MyProfileView: React.FC = () => {
  const { userName } = useAuth();
  const { profile, fetchProfile } = useProfile();

  // const { t } = useTranslation();

  // const [isEditing, setIsEditing] = useState(false);
  // const [isSaving] = useState(false);

  // const [statusMessage] = useState("");

  // const [formState, setFormState] = useState<ContactDetailsFormState>({
  //   phone: "",
  //   email: "",
  //   address: "",
  //   storePhotos: [],
  // });

  // useEffect(() => {
  //   if (!profile) return;

  //   setFormState({
  //     phone: profile.login_mobile ?? "",
  //     email: profile.lgin_email ?? "",
  //     address: profile.state_name ?? "",
  //     storePhotos: [],
  //   });
  // }, [profile]);

  useEffect(() => {
    fetchProfile();
  }, []);

  //   if (loading || !profile) {
  //   return (
  //     <div className="p-6 text-center text-gray-500">
  //       {t("Loading profile...")}
  //     </div>
  //   );
  // }

  const [openModal, setOpenModal] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleGeoUpdate = () => {
    setOpenModal(true);
  };

  const handleSaveLocation = () => {
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // console.log("NEW LOCATION:", lat, lng);

        // ✅ instant UI update
        setCurrentLocation({ lat, lng });

        try {
          const { data } = await saveAgentLocationApi({
            latitude: lat,
            longitude: lng,
          });

          if (data?.success === 1) {
            toast.success(data.message, { theme: "colored" });

            // ✅ refresh profile (sync backend)
            await fetchProfile();
          } else {
            toast.error("Update failed ❌");
          }
        } catch (err: any) {
          toast.error(
            err?.response?.data?.message || "Something went wrong ❌",
          );
        }

        setIsLocating(false);
        setOpenModal(false);
      },
      () => {
        toast.error("Unable to fetch location ❌");
        setIsLocating(false);
      },
    );
  };

  return (
    <div className="p-4 pb-24 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProfileHeader
        profile={profile}
        userName={userName}
        // isEditing={isEditing}
        // statusMessage={statusMessage}
        // onToggleEdit={() => setIsEditing((p) => !p)}
      />
      {/* <LanguageCard /> */}

      <GeoLocationCard
        profile={profile}
        isLocating={isLocating}
        onUpdate={handleGeoUpdate}
        currentLocation={currentLocation}
      />

      <ContactDetailsCard
        profile={profile}
        // formState={formState}
        // setFormState={setFormState}
        // isEditing={isEditing}
        // isSaving={isSaving}
        // onSave={handleSave}
      />

      <ChangePassword />

      <UpdateLocationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveLocation}
        latitude={Number(profile?.latitude)}
        longitude={Number(profile?.longitude)}
        isSaving={isLocating}
      />
    </div>
  );
};
