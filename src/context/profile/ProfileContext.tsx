// import {
//   createContext,
//   useCallback,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";
// import { getMyProfile } from "../../api/profile.api";

// /* ---------- Types ---------- */
// export interface UserProfile {
//   id: number;
//   name: string;
//   shortName: string;
//   agentName: string;
//   phone: string;
//   email: string;
//   address: string;
//   creditLimit: string;
//   state: string;
// }

// interface ProfileContextType {
//   profile: UserProfile | null;
//   loading: boolean;
//   refreshProfile: () => Promise<void>;
//   updateProfile: (data: Partial<UserProfile>) => void;
// }

// /* ---------- Context ---------- */
// export const ProfileContext =
//   createContext<ProfileContextType | null>(null);

// /* ---------- Provider ---------- */
// export const ProfileProvider = ({ children }: { children: ReactNode }) => {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   const refreshProfile = useCallback(async () => {
//     setLoading(true);
//     try {
//       const { data } = await getMyProfile();

//       const user = data.user;

//       setProfile({
//         id: user.id,
//         name: user.name,
//         shortName: user.short_name,
//         agentName: user.agent_name,
//         phone: user.login_mobile ?? "",
//         email: user.email ?? "",
//         address: user.billingaddress ?? "",
//         creditLimit: user.credit_limit,
//         state: user.state_name,
//       });
//     } catch (err) {
//       console.error("Failed to load profile", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateProfile = (data: Partial<UserProfile>) => {
//     setProfile((prev) => (prev ? { ...prev, ...data } : prev));
//   };

//   useEffect(() => {
//     refreshProfile();
//   }, [refreshProfile]);

//   return (
//     <ProfileContext.Provider
//       value={{ profile, loading, refreshProfile, updateProfile }}
//     >
//       {children}
//     </ProfileContext.Provider>
//   );
// };









import { createContext } from "react";
import type { UserProfile } from "../../types/profile";

export interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  fetchProfile : () => Promise<void>;
}

export const ProfileContext =
  createContext<ProfileContextType | null>(null);

