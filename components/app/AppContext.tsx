"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  buildLeaderboard,
  completionRate,
  initialsOf,
  PAST_DAYS,
  SEED_FRIENDS,
  SEED_REQUESTS,
  STARTING_STREAK,
  type Friend,
  type LeaderboardRow,
  type SessionResult,
} from "./progress";

export type Tab = "today" | "move" | "sleeve" | "friends" | "caregiver" | "settings";

/** Who the Care tab is showing: the family's report or the physio's view. */
export type CareView = "family" | "physio";

export type Profile = {
  elder: string;
  caregiver: string;
  /** Daily reminder. Kneedit suggests a time and the user sets it. */
  reminder: string;
  /** Whether the user appears on their friends' leaderboards. */
  shareToLeaderboard: boolean;
  /** What the family sees. The senior decides. */
  shareWeeklyReport: boolean;
  shareFallAlerts: boolean;
};

type AppContextValue = {
  tab: Tab;
  setTab: (t: Tab) => void;

  /** Today's prescribed session has been completed */
  sessionDone: boolean;

  /** Signal for the Move screen to auto-start a session */
  autoStart: boolean;
  setAutoStart: (v: boolean) => void;

  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;

  /** Prescribed sessions completed this week, today included */
  sessionsDone: number;
  /** sessionsDone as a share of the week's prescribed sessions */
  weekRate: number;
  streak: number;
  /** The most recent session, finished or stopped early */
  lastSession: SessionResult | null;
  /** Record a session: a complete one marks the day done and extends the streak */
  logSession: (session: SessionResult) => void;

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

  careView: CareView;
  setCareView: (v: CareView) => void;

  /** Family's notes field, which the physio reads in the visit summary */
  physioNote: string;
  setPhysioNote: (v: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>("today");
  const [sessionDone, setSessionDone] = useState(false);
  const [autoStart, setAutoStart] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    elder: "Mary",
    caregiver: "Wei",
    reminder: "9:00 AM",
    shareToLeaderboard: true,
    shareWeeklyReport: true,
    shareFallAlerts: true,
  });

  const [streak, setStreak] = useState(STARTING_STREAK);
  const [lastSession, setLastSession] = useState<SessionResult | null>(null);

  const [friends, setFriends] = useState<Friend[]>(SEED_FRIENDS);
  const [requests, setRequests] = useState<Friend[]>(SEED_REQUESTS);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [careView, setCareView] = useState<CareView>("family");
  const [physioNote, setPhysioNote] = useState("Knee felt stiff after a long walk on Thursday.");

  const sessionsDone = PAST_DAYS.filter(Boolean).length + (sessionDone ? 1 : 0);
  const weekRate = completionRate(sessionsDone);

  const logSession = useCallback(
    (session: SessionResult) => {
      setLastSession(session);
      // Only the first complete session of the day counts. A session stopped
      // early is kept, but shows as incomplete.
      if (!session.complete || sessionDone) return;
      setStreak((s) => s + 1);
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
      sessionsDone,
      streak,
      you: true,
    }),
    [profile.elder, sessionsDone, streak],
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
        autoStart,
        setAutoStart,
        profile,
        setProfile,
        sessionsDone,
        weekRate,
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
        careView,
        setCareView,
        physioNote,
        setPhysioNote,
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
