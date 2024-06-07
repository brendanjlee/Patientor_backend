export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatientEntry = Omit<PatientEntry, "id">;

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

// diary entry type with the id field omitted
export type NewDiaryEntry = Omit<DiaryEntry, "id">;
