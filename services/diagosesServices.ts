import DiagnosesEntries from "../data/diagnoses";
import { Diagnosis } from "../types";

const getAllDiagnosis = (): Diagnosis[] => {
  return DiagnosesEntries;
};

export default {
  getAllDiagnosis,
};
