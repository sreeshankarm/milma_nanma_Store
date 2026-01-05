// import { useEffect, useState } from "react";
import { useState } from "react";

import { ProfileContext } from "../../context/profile/ProfileContext";
import { getMyProfileApi } from "../../api/profile.api";
import type { UserProfile } from "../../types";

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile  = async () => {
    setLoading(true);
    try {
      const { data } = await getMyProfileApi();
      setProfile(data);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, fetchProfile  }}>
      {children}
    </ProfileContext.Provider>
  );
};
