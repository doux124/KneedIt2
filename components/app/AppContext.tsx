"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  buildLeaderboard,
  initialsOf,
  SEED_FRIENDS,
  SEED_REQUESTS,
  type ExerciseResult,
  type Friend,
  type LeaderboardRow,
} from "./points";

export type Tab = "today" | "move" | "sleeve" | "friends" | "caregiver" | "settings";

export type Profile = {
  elder: string;
  caregiver: string;
  /** Points the user is aiming for this week. */
  weeklyGoal: number;
  /** Whether the user appears on their friends' leaderboards. */
  shareToLeaderboard: boolean;
};

/** Points the user had already banked this week before the demo starts. */
const STARTING_POINTS = 186;

type AppContextValue = {
  tab: Tab;
  setTab: (t: Tab) => void;

  /** Today's guided session has been completed */
  sessionDone: boolean;
  setSessionDone: (v: boolean) => void;

  /** Signal for the Move screen to auto-start a session */
  autoStart: boolean;
  setAutoStart: (v: boolean) => void;

  profile: Profile;
  setProfile: (p: Profile) => void;

  /** Points earned this week, form multipliers included */
  weeklyPoints: number;
  streak: number;
  /** Per-exercise scoring from the most recent session */
  lastSession: ExerciseResult[] | null;
  /** Bank a finished session: adds points, marks the day done */
  logSession: (results: ExerciseResult[]) => void;

  friends: Friend[];
  requests: Friend[];
  addFriend: (f: Friend) => void;
  acceptRequest: (id: string) => void;
  dismissRequest: (id: string) => void;

  /** The user's own leaderboard row */
  you: Friend;
  leaderboard: LeaderboardRow[];
  /** The user's current position, 1-indexed */
  rank: number;

  addFriendOpen: boolean;
  setAddFriendOpen: (v: boolean) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>("today");
  const [sessionDone, setSessionDone] = useState(false);
  const [autoStart, setAutoStart] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    elder: "Mdm Tan",
    caregiver: "Wei",
    weeklyGoal: 400,
    shareToLeaderboard: true,
  });

  const [weeklyPoints, setWeeklyPoints] = useState(STARTING_POINTS);
  const [streak, setStreak] = useState(4);
  const [lastSession, setLastSession] = useState<ExerciseResult[] | null>(null);

  const [friends, setFriends] = useState<Friend[]>(SEED_FRIENDS);
  const [requests, setRequests] = useState<Friend[]>(SEED_REQUESTS);
  const [addFriendOpen, setAddFriendOpen] = useState(false);

  const logSession = useCallback(
    (results: ExerciseResult[]) => {
      const earned = results.reduce((sum, r) => sum + r.points, 0);
      setLastSession(results);
      setWeeklyPoints((p) => p + earned);
      // The streak only moves on the first session of the day.
      if (!sessionDone) setStreak((s) => s + 1);
      setSessionDone(true);
    },
    [sessionDone],
  );

  const addFriend = useCallback((f: Friend) => {
    setFriends((list) =>
      list.some((x) => x.id === f.id) ? list : [...list, { ...f, justAdded: true }],
    );
  }, []);

  const acceptRequest = useCallback(
    (id: string) => {
      const found = requests.find((r) => r.id === id);
      if (found) {
        setFriends((f) =>
          f.some((x) => x.id === id) ? f : [...f, { ...found, justAdded: true }],
        );
      }
      setRequests((list) => list.filter((r) => r.id !== id));
    },
    [requests],
  );

  const dismissRequest = useCallback((id: string) => {
    setRequests((list) => list.filter((r) => r.id !== id));
  }, []);

  const you = useMemo<Friend>(
    () => ({
      id: "you",
      name: profile.elder,
      initials: initialsOf(profile.elder),
      weeklyPoints,
      streak,
      you: true,
    }),
    [profile.elder, weeklyPoints, streak],
  );

  const leaderboard = useMemo(() => buildLeaderboard(friends, you), [friends, you]);
  const rank = useMemo(
    () => leaderboard.find((r) => r.you)?.rank ?? leaderboard.length,
    [leaderboard],
  );

  return (
    <AppContext.Provider
      value={{
        tab,
        setTab,
        sessionDone,
        setSessionDone,
        autoStart,
        setAutoStart,
        profile,
        setProfile,
        weeklyPoints,
        streak,
        lastSession,
        logSession,
        friends,
        requests,
        addFriend,
        acceptRequest,
        dismissRequest,
        you,
        leaderboard,
        rank,
        addFriendOpen,
        setAddFriendOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
