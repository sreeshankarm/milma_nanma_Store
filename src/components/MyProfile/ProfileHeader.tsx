import React from "react";
import { User, Edit3, ShieldCheck } from "lucide-react";
// import type { UserProfile } from "../../typesss/typesss";
import { useTranslation } from "../../utils/useTranslation";
import type { UserProfile } from "../../types/profile";

interface Props {
  profile: UserProfile | null;
  userName?: string | null;
  isEditing: boolean;
  statusMessage: string;
  onToggleEdit: () => void;
}

const ProfileHeader: React.FC<Props> = ({
  profile,
  userName,
  isEditing,
  statusMessage,
  onToggleEdit,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#13224c] text-white rounded-3xl p-5 shadow-xl border border-white/10">
      {/* <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">{t("Profile")}</p>
          <h1 className="text-2xl font-bold flex items-center gap-2 mt-1"><User size={20} /> {profile?.agent_name}</h1>
          <p className="text-sm text-blue-100 mt-1">Retailer • {userName}</p>
        </div>
        <div className="px-3 py-1.5 bg-white/15 rounded-full text-xs font-semibold flex items-center gap-2">
          <ShieldCheck size={14} /> {t("Verified partner")}
        </div>
      </div> */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section */}
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">
            {t("Profile")}
          </p>

          <h1 className="mt-1 flex items-center gap-2 text-lg sm:text-2xl font-bold truncate">
            <User size={18} className="shrink-0" />
            <span className="truncate">{profile?.agent_name}</span>
          </h1>

          <p className="mt-1 text-sm text-blue-100 truncate">
            Retailer • {userName}
          </p>
        </div>

        {/* Badge */}
        <div className="self-start sm:self-center">
          <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <ShieldCheck size={14} />
            {t("Verified partner")}
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-blue-100 leading-relaxed max-w-md">
        {t(
          "Keep your contact, address, and delivery geolocation up-to-date so your distributor can reach you quickly."
        )}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={onToggleEdit}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-sm active:scale-[0.99]"
        >
          <Edit3 size={16} /> {isEditing ? t("Close edit") : t("Edit profile")}
        </button>
        {statusMessage && (
          <span className="text-xs text-green-200 bg-green-900/40 px-3 py-1 rounded-full">
            {statusMessage}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
