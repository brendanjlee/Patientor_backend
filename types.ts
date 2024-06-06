export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";

export type Visibility = "great" | "good" | "ok" | "poor";

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

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
