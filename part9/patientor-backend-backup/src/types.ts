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

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Entry {
    }

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
      }

      export type NonLatinDiagnose = Omit<Diagnose, 'latin'>;

      export type NonSSNPatient = Omit<Patient, 'ssn' | 'entries'>;

      export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;
