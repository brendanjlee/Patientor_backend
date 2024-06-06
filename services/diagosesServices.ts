import DiagnosesEntries from "../data/diagnoses";
import { DiagnosesEntry } from "../types";

const getAllDiagnosis = (): DiagnosesEntry[] => {
  return DiagnosesEntries;
};

export default {
  getAllDiagnosis,
};
