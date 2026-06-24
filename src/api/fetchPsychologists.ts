import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
  type DataSnapshot,
} from "firebase/database";
import { realtimeDb } from "../config/firebase";
import type { Psychologist } from "../types/psychologists";

const PAGE_SIZE = 3;

export type PsychologistListItem = Psychologist & { id: string };

interface FetchPsychologistsPageResult {
  items: PsychologistListItem[];
  hasMore: boolean;
  nextCursor: string | null;
}

export async function fetchPsychologists(): Promise<PsychologistListItem[]> {
  const psychologistsRef = ref(realtimeDb, "service/psychologists");
  const psychologistsQuery = query(psychologistsRef, orderByKey());
  const snapshot: DataSnapshot = await get(psychologistsQuery);

  if (!snapshot.exists()) {
    return [];
  }

  const psychologists: PsychologistListItem[] = [];
  snapshot.forEach((child) => {
    if (!child.key) {
      return;
    }

    psychologists.push({
      id: child.key,
      ...(child.val() as Psychologist),
    });
  });

  return psychologists;
}

export async function fetchPsychologistsPage(
  cursorKey: string | null = null,
): Promise<FetchPsychologistsPageResult> {
  const psychologistsRef = ref(realtimeDb, "service/psychologists");
  const psychologistsQuery = query(
    psychologistsRef,
    orderByKey(),
    ...(cursorKey ? [startAfter(cursorKey)] : []),
    limitToFirst(PAGE_SIZE + 1),
  );
  const snapshot: DataSnapshot = await get(psychologistsQuery);

  if (!snapshot.exists()) {
    return {
      items: [],
      hasMore: false,
      nextCursor: cursorKey,
    };
  }

  const fetchedPsychologists: PsychologistListItem[] = [];
  snapshot.forEach((child) => {
    if (!child.key) {
      return;
    }

    fetchedPsychologists.push({
      id: child.key,
      ...(child.val() as Psychologist),
    });
  });

  const thereAreMore = fetchedPsychologists.length > PAGE_SIZE;
  const nextPage = thereAreMore
    ? fetchedPsychologists.slice(0, PAGE_SIZE)
    : fetchedPsychologists;

  return {
    items: nextPage,
    hasMore: thereAreMore,
    nextCursor:
      nextPage.length > 0 ? nextPage[nextPage.length - 1].id : cursorKey,
  };
}
