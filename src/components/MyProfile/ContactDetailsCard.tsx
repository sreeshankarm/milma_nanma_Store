import { Mail, MapPin, Phone, Save,Edit3 } from "lucide-react";
// import type { UserProfile, ContactDetailsFormState } from "../../typesss/typesss";
import type { Dispatch, SetStateAction } from "react";
import type { UserProfile, ContactDetailsFormState } from "../../types/profile";

interface ContactDetailsCardProps {
  profile: UserProfile | null;
  formState: ContactDetailsFormState;
  setFormState: Dispatch<SetStateAction<ContactDetailsFormState>>;
  isEditing: boolean;
  isSaving: boolean;
  onSave?: () => void;
}

const ContactDetailsCard: React.FC<ContactDetailsCardProps> = ({
  profile,
  formState,
  setFormState,
  isEditing,
  isSaving,
  onSave,
}) => (
  <div className="bg-white rounded-2xl border border-gray-300 p-4 space-y-4">
    <h3 className="font-semibold flex items-center gap-2"><Edit3 size={16} />  Contact details</h3>

    {isEditing ? (
      <>
        {/* Phone */}
        <div className="relative">
          <Phone
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={formState.phone}
            onChange={(e) =>
              setFormState((p) => ({ ...p, phone: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-xl pl-10 pr-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="Phone"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState((p) => ({ ...p, email: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-xl pl-10 pr-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="Email"
          />
        </div>

        {/* Address */}
        <div className="relative">
          <MapPin
            size={16}
            className="absolute left-3 top-3 text-gray-400"
          />
          <textarea
            value={formState.address}
            onChange={(e) =>
              setFormState((p) => ({ ...p, address: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-xl pl-10 pr-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-sky-200"
            rows={3}
            placeholder="Address"
          />
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="w-full bg-[#8b0000] text-white py-3 rounded-xl font-semibold
                     flex items-center justify-center gap-2
                     disabled:opacity-60 hover:bg-[#b91c1c] transition"
        >
          <Save size={16} />
          <span>{isSaving ? "Saving..." : "Save contact info"}</span>
        </button>
      </>
    ) : (
      <div className="space-y-3 text-sm">
        <p className="flex items-center gap-2">
          <Phone size={14} /> {profile?.login_mobile}

        </p>
        <p className="flex items-center gap-2">
          <Mail size={14} /> {profile?.lgin_email ?? "-"}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={14} /> {profile?.state_name}
        </p>
      </div>
    )}
  </div>
);

export default ContactDetailsCard;
