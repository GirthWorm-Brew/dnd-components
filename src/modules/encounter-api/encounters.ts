import axios, { AxiosInstance } from "axios";
import { CreateEncounterRequest, AddCombatantRequest } from "./types";

export const BASE_URL = "/api/encounters";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const addEncounter = async (data: CreateEncounterRequest) => {
  const res = await api.post("", data);
  return res.data;
};

const listEncounters = async () => {
  const res = await api.get("");
  return res;
};

const getEncounterSnapshot = async (encounterId: string) => {
  const res = await api.get(`${encounterId}/state`);
  return res;
};

const addCombatant = async (
  combatant: AddCombatantRequest,
  encounterId: string
) => {
  const res = await api.post(`${encounterId}/combatants`, combatant);
  return res;
};

const deleteCombatant = async (encounterId: string, combatantId: string) => {
  const res = await api.delete(`${encounterId}/combatants/${combatantId}`);
  return res;
};

export {
  addEncounter,
  listEncounters,
  getEncounterSnapshot,
  addCombatant,
  deleteCombatant,
};
