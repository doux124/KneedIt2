/**
 * Progress model for the Kneedit demo.
 *
 * The sleeve confirms each rep and scores form out of 10. Friends are ranked
 * by the share of this week's prescribed sessions they completed, then by
 * streak. Sessions beyond the prescribed one a day never count, so doing more
 * is never rewarded over doing it properly.
 */

/** One guided session a day is prescribed. */
export const SESSIONS_PER_WEEK = 7;

/**
 * Monday to Friday of this week, before today (Saturday). Tuesday was missed,
 * which is why the streak started again on Wednesday.
 */
export const PAST_DAYS = [true, false, true, true, true];
export const STARTING_STREAK = 3;

export type Exercise = {
  id: string;
  name: string;
  reps: number;
  focus: string;
  src: string;
  poster: string;
};

/** Today's prescribed set. Clips live in /public/videos. */
export const EXERCISES: Exercise[] = [
  { id: "knee-ext", name: "Seated knee extensions", reps: 8, focus: "Quad strength", src: "/videos/knee.mp4", poster: "/videos/knee-poster.jpg" },
  { id: "ankle", name: "Ankle circles", reps: 10, focus: "Circulation", src: "/videos/ankle.mp4", poster: "/videos/ankle-poster.jpg" },
  { id: "quad-set", name: "Quad sets", reps: 6, focus: "Joint stability", src: "/videos/quad.mp4", poster: "/videos/quad-poster.jpg" },
];

/** The two taps after each exercise. Both feed the physio's weekly report. */
export type Feedback = { hurt: boolean; easy: boolean };

export type ExerciseResult = {
  id: string;
  name: string;
  reps: number;
  /** Out of 10, to one decimal place, from the sleeve. */
  formScore: number;
  feedback: Feedback;
};

export type SessionResult = {
  exercises: ExerciseResult[];
  /** False when the session was stopped early. It then shows as incomplete. */
  complete: boolean;
};

/** Average form score across the exercises done, out of 10. */
export function sessionScore(results: ExerciseResult[]): number | null {
  if (results.length === 0) return null;
  const avg = results.reduce((sum, r) => sum + r.formScore, 0) / results.length;
  return Math.round(avg * 10) / 10;
}

export function formatScore(score: number): string {
  return `${score.toFixed(1)}/10`;
}

/** Share of this week's prescribed sessions done, as a whole percentage. */
export function completionRate(sessionsDone: number): number {
  return Math.round((Math.min(sessionsDone, SESSIONS_PER_WEEK) / SESSIONS_PER_WEEK) * 100);
}

export type Friend = {
  id: string;
  name: string;
  initials: string;
  /** Prescribed sessions completed this week, out of SESSIONS_PER_WEEK. */
  sessionsDone: number;
  streak: number;
  /** Marks the signed-in user's own row in the leaderboard. */
  you?: boolean;
  /** Added during this demo session, so the row can be highlighted. */
  justAdded?: boolean;
};

export type LeaderboardRow = Friend & { rank: number; rate: number };

/** Friends the user already exercises with. */
export const SEED_FRIENDS: Friend[] = [
  { id: "lim", name: "Uncle Lim", initials: "UL", sessionsDone: 6, streak: 11 },
  { id: "rosnah", name: "Auntie Rosnah", initials: "AR", sessionsDone: 5, streak: 8 },
  { id: "chua", name: "Mr Chua", initials: "MC", sessionsDone: 5, streak: 2 },
  { id: "devi", name: "Auntie Devi", initials: "AD", sessionsDone: 4, streak: 1 },
  { id: "boon", name: "Uncle Boon", initials: "UB", sessionsDone: 2, streak: 1 },
];

/** Incoming requests waiting on the user. */
export const SEED_REQUESTS: Friend[] = [
  { id: "siti", name: "Mdm Siti", initials: "MS", sessionsDone: 5, streak: 6 },
];

/** People the app suggests, from the same block or exercise group. */
export const SUGGESTED_FRIENDS: (Friend & { context: string })[] = [
  { id: "goh", name: "Auntie Goh", initials: "AG", sessionsDone: 6, streak: 9, context: "Block 128 walking group" },
  { id: "raj", name: "Uncle Raj", initials: "UR", sessionsDone: 5, streak: 7, context: "Same physiotherapy clinic" },
  { id: "mei", name: "Mdm Mei", initials: "MM", sessionsDone: 4, streak: 4, context: "Block 128 walking group" },
  { id: "hassan", name: "Mr Hassan", initials: "MH", sessionsDone: 3, streak: 2, context: "Invited by Uncle Lim" },
  { id: "wong", name: "Auntie Wong", initials: "AW", sessionsDone: 3, streak: 3, context: "Nearby community centre" },
];

/** Build the ranked table, user included: completion rate first, then streak. */
export function buildLeaderboard(friends: Friend[], you: Friend): LeaderboardRow[] {
  return [...friends, you]
    .map((f) => ({ ...f, rate: completionRate(f.sessionsDone) }))
    .sort((a, b) => b.rate - a.rate || b.streak - a.streak || a.name.localeCompare(b.name))
    .map((f, i) => ({ ...f, rank: i + 1 }));
}

/** Initials for a display name, used for friend avatars. */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
