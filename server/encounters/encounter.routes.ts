import { Router } from "express";
import * as repo from "./encounter.repo";
import { getSnapshot } from "./encounter.service";

export const encounterRoutes = Router();

// Start a new encounter in setup state.
encounterRoutes.post("/", (req, res) => {
  const encounter = repo.createEncounter(req.body.name ?? "Untitled Encounter");
  res.status(201).json(encounter);
});

// Return the current encounter and its combatants for initial page load.
encounterRoutes.get("/:encounterId/state", (req, res) => {
  res.json(getSnapshot(req.params.encounterId));
});

// Add a player, enemy, or NPC combatant to an encounter.
encounterRoutes.post("/:encounterId/combatants", (req, res) => {
  const combatant = repo.addCombatant({
    encounterId: req.params.encounterId,
    kind: req.body.kind,
    displayName: req.body.displayName,
    initiative: req.body.initiative,
    currentHp: req.body.currentHp,
    maxHp: req.body.maxHp,
  });

  res.status(201).json(combatant);
});
