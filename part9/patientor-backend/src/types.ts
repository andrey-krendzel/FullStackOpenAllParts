/*       "code": "M24.2",
      "name": "Disorder of ligament",
      "latin": "Morbositas ligamenti" */

      /*         "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
        "name": "Hans Gruber",
        "dateOfBirth": "1970-04-25",
        "ssn": "250470-555L",
        "gender": "male",
        "occupation": "Technician"
        */

  

      export interface Diagnose {
        code: string;
        name: string;
        latin?: string
      }

      export interface Patient {
          id: string;
          name: string;
          dateOfBirth: string;
          ssn: string;
          gender: string;
          occupation: string;
          entries: Entry[];

      }

      export enum Gender {
          Male = 'male',
          Female = 'female',
          Other = 'other'
      }

      interface BaseEntry {
        id: string;
        description: string;
        date: string;
        specialist: string;
        diagnosisCodes?: Array<Diagnose['code']>;
      }

      export enum HealthCheckRating {
        'Healthy' = 0,
        'LowRisk' = 1,
        'HighRisk' = 2,
        'CriticalRisk' = 3
      }

      export interface HospitalEntry extends BaseEntry {
        type: 'Hospital';
        discharge: {
          date: string;
          criteria: string;
        };
      }

      export interface OccupationalHealthcareEntry extends BaseEntry {
        type: 'OccupationalHealthcare';
        employerName: string;
        sickLeave?: {
          startDate: string;
          endDate: string;
        };
      }

      export interface HealthCheckEntry extends BaseEntry {
        type: 'HealthCheck';
        healthCheckRating: HealthCheckRating;
      }


      export type Entry =
      | HealthCheckEntry
      | HospitalEntry
      | OccupationalHealthcareEntry;

      export type NonLatinDiagnose = Omit<Diagnose, 'latin'>;

      export type NonSSNPatient = Omit<Patient, 'ssn' | 'entries'>;

      export type NewPatientEntry = Omit<Patient, 'id'>;

