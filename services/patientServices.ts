import patientData from "../data/patients";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): PatientEntry[] => {
  return patientData;
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

const addPatientEntry = (patientEntry: NewPatientEntry): PatientEntry => {
  const _id: string = uuid(); // generate new id
  const newPatient = {
    id: _id,
    ...patientEntry,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatientEntry,
};
