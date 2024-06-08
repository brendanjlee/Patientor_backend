import patientData from "../data/patientsData";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patientData;
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find((entry) => entry.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientEntry: NewPatient): Patient => {
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
  addPatient,
};
