export type DamageCombatantCommand = {
  type: "command.damage";
  expectedVersion: number;
  payload: {
    combatantId: string;
    amount: number;
  };
};

export type EncounterCommand = DamageCombatantCommand;
