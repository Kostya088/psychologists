import { useEffect, useState } from "react";
import { get, ref, type DataSnapshot } from "firebase/database";
import { realtimeDb } from "../../config/firebase";
import type { Psychologist } from "../../types/psychologists";

export default function Psychologists() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const psychologistsRef = ref(realtimeDb, "service/psychologists");
        const snapshot: DataSnapshot = await get(psychologistsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setPsychologists(Array.isArray(data) ? data : Object.values(data));
        } else {
          setPsychologists([]);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load psychologists from Firebase.",
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  if (loading) return <p>Loading psychologists...</p>;

  if (error) {
    return (
      <>
        <h1>Psychologists</h1>
        <p>Could not load psychologists: {error}</p>
      </>
    );
  }

  return (
    <>
      <h1>Psychologists</h1>
      {psychologists.length === 0 ? <p>No psychologists found.</p> : null}
      <ul>
        {psychologists.map((doctor, index) => (
          <li key={index}>
            <p>{doctor.name}</p>
            <p>{doctor.specialization}</p>
            <p>{doctor.experience}</p>
            <p>{doctor.price_per_hour}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
