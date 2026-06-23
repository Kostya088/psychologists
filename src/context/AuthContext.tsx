// // src/context/AuthContext.tsx
// import { createContext, useContext, useEffect, useState } from "react";
// import type { ReactNode } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import type { User } from "firebase/auth";
// import { doc, onSnapshot } from "firebase/firestore";
// import { auth, db } from "../config/firebase";

// // Define the structure of the extra user data from Firestore
// interface UserProfileData {
//   favoriteDoctors: string[];
//   createdAt?: string;
// }

// interface AuthContextType {
//   currentUser: User | null; // The Firebase Auth object
//   userData: UserProfileData | null; // The extra data from Firestore (e.g., favorites)
//   loading: boolean;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [userData, setUserData] = useState<UserProfileData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let unsubscribeFromFirestore: () => void = () => {};

//     // The Auth State Listener
//     const unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);

//       if (user) {
//         // Requirement: "getting data about the current user"
//         // We use onSnapshot to listen for database changes in real-time
//         const userDocRef = doc(db, "users", user.uid);
//         unsubscribeFromFirestore = onSnapshot(
//           userDocRef,
//           (docSnap) => {
//             if (docSnap.exists()) {
//               setUserData(docSnap.data() as UserProfileData);
//             } else {
//               // Failsafe if the document hasn't been created yet
//               setUserData({ favoriteDoctors: [] });
//             }
//             setLoading(false);
//           },
//           (error) => {
//             console.error("Error fetching user data:", error);
//             setLoading(false);
//           },
//         );
//       } else {
//         // If the user logs out, clear their data from the local state
//         setUserData(null);
//         setLoading(false);
//       }
//     });

//     return () => {
//       unsubscribeFromAuth();
//       unsubscribeFromFirestore();
//     };
//   }, []);

//   // Requirement: "logout"
//   const logout = async () => {
//     await signOut(auth);
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, userData, loading, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// }
