//import { State } from "./state";

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}


export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries: HospitalEntry[];

}

export interface HospitalEntry {
       
  id: string;
  date: string;
  type: 'hospital';
  specialist: string;
  diagnoseCodes?: Array<Diagnose['code']>;
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}
