"use client";

import { createContext, useContext, useState } from "react";

export type Tab = "today" | "move" | "sleeve" | "caregiver" | "settings";

export type Profile = {
  elder: string;
  caregiver: string;
  screenLimit: number; // minutes
};

type AppContextValue = {
  tab: Tab;
  setTab: (t: Tab) => void;

  /** Phone-lock overlay is showing */
  locked: boolean;
  setLocked: (v: boolean) => void;

  /** Today's guided session has been completed */
  sessionDone: boolean;
  setSessionDone: (v: boolean) => void;

  /** Signal for the Move screen to auto-start a session */
  autoStart: boolean;
  setAutoStart: (v: boolean) => void;

  profile: Profile;
  setProfile: (p: Profile) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>("today");
  const [locked, setLocked] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [autoStart, setAutoStart] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    elder: "Mdm Tan",
    caregiver: "Wei",
    screenLimit: 45,
  });

  return (
    <AppContext.Provider
      value={{
        tab,
        setTab,
        locked,
        setLocked,
        sessionDone,
        setSessionDone,
        autoStart,
        setAutoStart,
        profile,
        setProfile,
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
