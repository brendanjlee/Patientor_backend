export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";

export type Visibility = "great" | "good" | "ok" | "poor";

export type Gender = "male" | "female" | "other";

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
  gender: Gender;
  occupation: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
