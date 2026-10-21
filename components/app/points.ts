/**
 * Scoring model for the Kneedit leaderboard.
 *
 * The sleeve grades every rep on range of motion, muscle engagement and
 * smoothness. That form score decides the multiplier, so a short session done
 * properly beats a long one rushed.
 */

export type FormGrade = "perfect" | "great" | "good" | "fair";

export const POINTS_PER_REP = 2;

export const GRADES: Record<
  FormGrade,
  { label: string; short: string; multiplier: number; min: number }
> = {
  perfect: { label: "Perfect form", short: "Perfect", multiplier: 3, min: 90 },
  great: { label: "Great form", short: "Great", multiplier: 2, min: 75 },
  good: { label: "Good form", short: "Good", multiplier: 1.5, min: 60 },
  fair: { label: "Getting there", short: "Fair", multiplier: 1, min: 0 },
};

/** Order used anywhere the whole ladder is shown. */
export const GRADE_ORDER: FormGrade[] = ["perfect", "great", "good", "fair"];

export function gradeFor(formScore: number): FormGrade {
  if (formScore >= GRADES.perfect.min) return "perfect";
  if (formScore >= GRADES.great.min) return "great";
  if (formScore >= GRADES.good.min) return "good";
  return "fair";
}

export function pointsFor(reps: number, formScore: number): number {
  return Math.round(reps * POINTS_PER_REP * GRADES[gradeFor(formScore)].multiplier);
}

export type ExerciseResult = {
  id: string;
  name: string;
  reps: number;
  /** 0 to 100, straight from the sleeve. */
  formScore: number;
  grade: FormGrade;
  points: number;
};

export type Exercise = {
  id: string;
  name: string;
  reps: number;
  focus: string;
  src: string;
  poster: string;
};

/** Today's guided set. Clips live in /public/videos. */
export const EXERCISES: Exercise[] = [
  { id: "knee-ext", name: "Seated knee extensions", reps: 8, focus: "Quad strength", src: "/videos/knee.mp4", poster: "/videos/knee-poster.jpg" },
  { id: "ankle", name: "Ankle circles", reps: 10, focus: "Circulation", src: "/videos/ankle.mp4", poster: "/videos/ankle-poster.jpg" },
  { id: "quad-set", name: "Quad sets", reps: 6, focus: "Joint stability", src: "/videos/quad.mp4", poster: "/videos/quad-poster.jpg" },
];

/** Best case for one session: every rep at the top multiplier. */
export const MAX_SESSION_POINTS = EXERCISES.reduce(
  (sum, e) => sum + maxPointsFor(e.reps),
  0,
);

/** Ceiling for a set of this length, used to advertise what's on offer. */
export function maxPointsFor(reps: number): number {
  return reps * POINTS_PER_REP * GRADES.perfect.multiplier;
}

export type Friend = {
  id: string;
  name: string;
  initials: string;
  weeklyPoints: number;
  streak: number;
  /** Marks the signed-in user's own row in the leaderboard. */
  you?: boolean;
  /** Added during this demo session, so the row can be highlighted. */
  justAdded?: boolean;
};

export type LeaderboardRow = Friend & { rank: number };

/** Friends the user already exercises with. */
export const SEED_FRIENDS: Friend[] = [
  { id: "lim", name: "Uncle Lim", initials: "UL", weeklyPoints: 336, streak: 11 },
  { id: "rosnah", name: "Auntie Rosnah", initials: "AR", weeklyPoints: 312, streak: 8 },
  { id: "chua", name: "Mr Chua", initials: "MC", weeklyPoints: 228, streak: 5 },
  { id: "devi", name: "Auntie Devi", initials: "AD", weeklyPoints: 174, streak: 3 },
  { id: "boon", name: "Uncle Boon", initials: "UB", weeklyPoints: 96, streak: 1 },
];

/** Incoming requests waiting on the user. */
export const SEED_REQUESTS: Friend[] = [
  { id: "siti", name: "Mdm Siti", initials: "MS", weeklyPoints: 204, streak: 6 },
];

/** People the app suggests, from the same block or exercise group. */
export const SUGGESTED_FRIENDS: (Friend & { context: string })[] = [
  { id: "goh", name: "Auntie Goh", initials: "AG", weeklyPoints: 288, streak: 9, context: "Block 128 walking group" },
  { id: "raj", name: "Uncle Raj", initials: "UR", weeklyPoints: 252, streak: 7, context: "Same physiotherapy clinic" },
  { id: "mei", name: "Mdm Mei", initials: "MM", weeklyPoints: 198, streak: 4, context: "Block 128 walking group" },
  { id: "hassan", name: "Mr Hassan", initials: "MH", weeklyPoints: 144, streak: 2, context: "Invited by Uncle Lim" },
  { id: "wong", name: "Auntie Wong", initials: "AW", weeklyPoints: 120, streak: 3, context: "Nearby community centre" },
];

/** Build the ranked table, user included, highest points first. */
export function buildLeaderboard(friends: Friend[], you: Friend): LeaderboardRow[] {
  return [...friends, you]
    .sort((a, b) => b.weeklyPoints - a.weeklyPoints || a.name.localeCompare(b.name))
    .map((f, i) => ({ ...f, rank: i + 1 }));
}

/** Initials for a display name, used for friend avatars. */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
