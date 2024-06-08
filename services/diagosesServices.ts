import DiagnosesEntries from "../data/diagnosesData";
import { Diagnosis } from "../types";

const getAllDiagnosis = (): Diagnosis[] => {
  return DiagnosesEntries;
};

export default {
  getAllDiagnosis,
};
