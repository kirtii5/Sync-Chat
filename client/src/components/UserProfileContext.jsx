import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const res = await axios.get("http://localhost:4000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };

    if (user) fetchProfile();
  }, [user, getToken]);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
