import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../../config/firebase";
import { AuthContext } from "./authContext";
import {
  addFavorite,
  fetchUserFavorites,
  removeFavorite,
} from "../../api/favorites";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      try {
        if (firebaseUser) {
          const userFavorites = await fetchUserFavorites(firebaseUser.uid);
          setFavorites(userFavorites);
        } else {
          setFavorites([]);
        }
      } catch (err) {
        console.error(err);
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleFavorite = async (psychologistId: string): Promise<void> => {
    if (!user) return;

    const isFavorite = favorites.includes(psychologistId);

    if (isFavorite) {
      await removeFavorite(user.uid, psychologistId);
      setFavorites((prev) => prev.filter((id) => id !== psychologistId));
    } else {
      await addFavorite(user.uid, psychologistId);
      setFavorites((prev) => [...prev, psychologistId]);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, logout, favorites, toggleFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
};
