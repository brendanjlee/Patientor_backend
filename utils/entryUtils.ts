import {
  NewEntry,
  Discharge,
  HealthCheckRating,
  SickLeave,
  Diagnosis,
} from "../types";

// validate that this is a base entry
const isEntry = (object: unknown): object is NewEntry => {
  if (!object || typeof object != "object") return false;
  return (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object
  );
};

// Check and Parse strings
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: string): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect string field:" + text);
  }
  return text.trim();
};

// Check and parse date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// Check and parse discharge
const isDischarge = (object: unknown): object is Discharge => {
  if (!object || typeof object != "object") return false;

  if (!("date" in object && "criteria" in object)) return false;

  if (
    !isString(object.date) ||
    !isDate(object.date) ||
    !isString(object.criteria)
  )
    return false;

  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge))
    throw new Error(
      `Incorrect or missing discharge: ${JSON.stringify(discharge)}`
    );

  return discharge;
};

// Check and parse healthcheck
const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return (
    typeof param === "number" &&
    Object.values(HealthCheckRating).includes(param)
  );
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};

// check and parse sick leave
const isSickLeave = (object: unknown): object is SickLeave => {
  if (!object || typeof object != "object") return false;
  return (
    "startDate" in object &&
    "endDate" in object &&
    isString(object.startDate) &&
    isString(object.endDate) &&
    isDate(object.startDate) &&
    isDate(object.endDate)
  );
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) return undefined;
  if (!isSickLeave(sickLeave)) throw new Error("Invalid sickleave");
  return sickLeave;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis["code"]> => {
  if (!codes || typeof codes !== "object") {
    console.log("missing!");
    return [] as Array<Diagnosis["code"]>;
  }

  return codes as Array<Diagnosis["code"]>;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!isEntry(object)) {
    throw new Error(
      `Incorrect or missing entry data: ${JSON.stringify(object)}`
    );
  }

  switch (object.type) {
    case "Hospital": {
      const hospitalEntry: NewEntry = {
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        type: "Hospital",
        description: parseString(object.description),
        discharge: parseDischarge(object.discharge),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
      return hospitalEntry;
    }
    case "HealthCheck": {
      const healthCheckEntry: NewEntry = {
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        type: "HealthCheck",
        description: parseString(object.description),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
      return healthCheckEntry;
    }
    case "OccupationalHealthcare": {
      const occupationalEntry: NewEntry = {
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        type: "OccupationalHealthcare",
        description: parseString(object.description),
        employerName: parseString(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
      return occupationalEntry;
    }
    default:
      throw new Error("Failed parsing object");
  }
};

export default {
  toNewEntry,
};

// hopistal
/*
{
    "date": "2019-05-01",
    "specialist": "Dr Byte House",
    "type": "Hospital",
    "description": "Digital overdose, very bytestatic. Otherwise healthy.",
    "discharge": {
        "date": "2099-05-12",
        "criteria": "farts"
    }
}

{
    "date": "2019-05-01",
    "specialist": "Dr Byte House",
    "type": "HealthCheck",
    "description": "Digital overdose, very bytestatic. Otherwise healthy.",
    "healthCheckRating": 3
}

{
    "date": "2019-05-01",
    "specialist": "Dr Byte House",
    "type": "OccupationalHealthcare",
    "description": "Digital overdose, very bytestatic. Otherwise healthy.",
    "employerName": "Boeing",
    "sickLeave": {
        "startDate": "2019-08-05",
        "endDate": "2019-08-28"
    }
}
*/
