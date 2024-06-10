/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  NewDiaryEntry,
  Weather,
  Visibility,
  NewPatient,
  Gender,
  Entry,
} from "../types";

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

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
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

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseStringEntry = (field: unknown) => {
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

const toNewPatient = (object: unknown): NewPatient => {
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
    const newEntry: NewPatient = {
      name: parseStringEntry(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringEntry(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringEntry(object.occupation),
      entries: <Entry[]>[],
    };
    return newEntry;
  }

  throw new Error(`Incorrect data: missing fields`);
};

//entry parsing

// // validate that this is a base entry
// const isEntry = (object: unknown): object is NewEntry => {
//   if (!object || typeof object != "object") return false;
//   return (
//     "type" in object &&
//     "description" in object &&
//     "date" in object &&
//     "specialist" in object
//   );
// };

// const isEntryType = (param: string): param is EntryType => {
//   return Object.values(EntryType)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseEntryType = (entryType: unknown): EntryType => {
//   if (!entryType || !isString(entryType) || !isEntryType(entryType)) {
//     throw new Error("Incorrect or missing entry type: " + entryType);
//   }
//   return entryType;
// };

// const parseByEntryType = (
//   _object: NewEntry,
//   entryType: EntryType
// ): NewEntry | undefined => {
//   switch (entryType) {
//     case EntryType.Hospital: {
//       console.log("hospital");
//       return undefined;
//     }
//     case EntryType.HealthCheck: {
//       console.log("healthcheck");
//       return undefined;
//     }
//     case EntryType.OccupationalHealthcare: {
//       console.log("occu");
//       return undefined;
//     }
//     default:
//       return undefined;
//   }
// };

// const toNewEntry = (object: unknown): NewEntry => {
//   if (!isEntry(object)) {
//     throw new Error(
//       `Incorrect or missing entry data: ${JSON.stringify(object)}`
//     );
//   }

//   const newEntry = parseByEntryType(object, parseEntryType(object.type));
//   console.log(`Created new entry ${newEntry}`);

//   const newEntry1: NewEntry = {
//     date: "2015-01-02",
//     type: EntryType.Hospital,
//     specialist: "My Brother",
//     diagnosisCodes: ["S62.5"],
//     description:
//       "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
//     discharge: {
//       date: "2015-01-16",
//       criteria: "Thumb has healed.",
//     },
//   };
//   return newEntry1;
// };

export default {
  toNewDiaryEntry,
  toNewPatient,
  // toNewEntry,
};

/*
{
    "id": "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
    "date": "2015-01-02",
    "type": "Hospital",
    "specialist": "MD House",
    "diagnosisCodes": [
        "S62.5"
    ],
    "description": "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
    "discharge": {
        "date": "2015-01-16",
        "criteria": "Thumb has healed."
    }
}
*/
