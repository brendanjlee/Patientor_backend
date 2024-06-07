/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NewDiaryEntry, Weather, Visibility, NewPatientEntry } from "./types";

// validation functions //
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};
const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or Missing comment");
  }
  return comment;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather: " + weather);
  }
  return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility: " + visibility);
  }
  return visibility;
};

const parseStringEntry = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error("Incorrect string field:" + field);
  }
  return field.trim();
};

// Create new diary entry
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object != "object") {
    throw new Error(`Incorrect or missing patient data: ${object}`);
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStringEntry(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringEntry(object.ssn),
      gender: parseStringEntry(object.gender),
      occupation: parseStringEntry(object.occupation),
    };
    return newEntry;
  }

  throw new Error(`Incorrect data: missing fields`);
};

export default {
  toNewDiaryEntry,
  toNewPatientEntry,
};
