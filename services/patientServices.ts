import patientData from "../data/patients";
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patientData;
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find((entry) => entry.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatientEntry = (patientEntry: NewPatientEntry): Patient => {
  const _id: string = uuid(); // generate new id
  const newPatient = {
    id: _id,
    ...patientEntry,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatient,
  getPatients,
  getNonSensitivePatients,
  addPatientEntry,
};
