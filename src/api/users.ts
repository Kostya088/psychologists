import { DataSnapshot, get, ref, remove, set } from "firebase/database";
import { realtimeDb } from "../config/firebase";

export async function addFavorite(
  userId: string,
  psychologistId: string,
): Promise<void> {
  const favoriteRef = ref(
    realtimeDb,
    `service/users/${userId}/favorites/${psychologistId}`,
  );
  await set(favoriteRef, true);
}

export async function removeFavorite(
  userId: string,
  psychologistId: string,
): Promise<void> {
  const favoriteRef = ref(
    realtimeDb,
    `service/users/${userId}/favorites/${psychologistId}`,
  );

  await remove(favoriteRef);
}

export async function fetchUserFavorites(userId: string): Promise<string[]> {
  const favoriteRef = ref(realtimeDb, `service/users/${userId}/favorites`);

  const snapshot: DataSnapshot = await get(favoriteRef);

  if (!snapshot.exists()) {
    return [];
  }

  return Object.keys(snapshot.val());
}
