import type { EncounterSnapshot } from "./encounter.types";

export type StateSnapshotMessage = {
  type: "state.snapshot";
  payload: EncounterSnapshot;
};

export type CombatantHpChangedEvent = {
  id: string;
  encounterId: string;
  type: "event.combatants.hp_changed";
  version: number;
  payload: {
    combatantId: string;
    previousHp: number;
    currentHp: number;
    delta: number;
  };
  createdAt: string;
};

export type VersionConflictError = {
  type: "error.version_conflict";
  currentVersion: number;
};

export type EncounterEvent =
  | StateSnapshotMessage
  | CombatantHpChangedEvent
  | VersionConflictError;
