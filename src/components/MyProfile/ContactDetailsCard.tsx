import { Mail, MapPin, Phone, Save } from "lucide-react";
import type { UserProfile, ContactDetailsFormState } from "../../types/types";
import type { Dispatch, SetStateAction } from "react";

interface ContactDetailsCardProps {
  profile: UserProfile;
  formState: ContactDetailsFormState;
  setFormState: Dispatch<SetStateAction<ContactDetailsFormState>>;
  isEditing: boolean;
  isSaving: boolean;
  onSave: () => void;
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
    <h3 className="font-semibold">Contact details</h3>

    {isEditing ? (
      <>
        <input
          value={formState.phone}
          onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))}
          className="w-full border rounded-xl px-3 py-2 text-sm"
          placeholder="Phone"
        />
        <input
          value={formState.email}
          onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
          className="w-full border rounded-xl px-3 py-2 text-sm"
          placeholder="Email"
        />
        <textarea
          value={formState.address}
          onChange={(e) => setFormState((p) => ({ ...p, address: e.target.value }))}
          className="w-full border rounded-xl px-3 py-2 text-sm"
          rows={3}
          placeholder="Address"
        />
        <button
          onClick={onSave}
          disabled={isSaving}
          className="w-full bg-brand-red text-white py-3 rounded-xl font-semibold flex justify-center gap-2"
        >
          <Save size={16} /> {isSaving ? "Saving..." : "Save"}
        </button>
      </>
    ) : (
      <div className="space-y-3 text-sm">
        <p className="flex items-center gap-2"><Phone size={14} /> {profile.phone}</p>
        <p className="flex items-center gap-2"><Mail size={14} /> {profile.email}</p>
        <p className="flex items-center gap-2"><MapPin size={14} /> {profile.address}</p>
      </div>
    )}
  </div>
);

export default ContactDetailsCard;
