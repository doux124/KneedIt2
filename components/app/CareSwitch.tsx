"use client";

import { useApp, type CareView } from "./AppContext";
import { Segmented } from "./ui";

const VIEWS: { id: CareView; label: string }[] = [
  { id: "family", label: "Family" },
  { id: "physio", label: "Physio" },
];

/** Switches the Care tab between the family's report and the physio's view. */
export function CareSwitch() {
  const { careView, setCareView } = useApp();
  return <Segmented options={VIEWS} value={careView} onChange={setCareView} label="Who is viewing" />;
}
