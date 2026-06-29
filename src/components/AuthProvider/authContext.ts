import { createContext } from "react";
import type { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  favorites: string[];
  toggleFavorite: (id: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
