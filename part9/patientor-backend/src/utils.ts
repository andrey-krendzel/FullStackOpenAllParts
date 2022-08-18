import { NewPatientEntry, Gender, Entry } from './types';


      /* "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
        "name": "Hans Gruber",
        "dateOfBirth": "1970-04-25",
        "ssn": "250470-555L",
        "gender": "male",
        "occupation": "Technician"
        */

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (str: string): str is Gender => {
    return ['male', 'female'].includes(str);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};


const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)){
      throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
    };

const parseGender = (gender: unknown): Gender => {
        if (!gender || !isString(gender) || !isGender(gender)) {
            throw new Error('Incorrect or missing gender: ' + gender);
        }
        return gender;
    };
    

//These are the same as parseName

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries: any): Entry[] => {
    if (!entries) {
      throw new Error(`Incorrect or missing entries: ${entries}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
  };

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries:unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };

    return newEntry;
};

export default toNewPatientEntry;