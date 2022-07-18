import patients from '../../data/patients';
import { Patient, NonSSNPatient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';


const getEntries = (): Patient[] => {
    return patients;
};

const getNonSSNEntries = (): NonSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
     gender,
     occupation
   }));
  
};

const addEntry = ( entry: NewPatientEntry ): Patient => {
  const id = uuid();

  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);

  return newPatientEntry;

  };

  export default {
    getEntries,
    addEntry,
    getNonSSNEntries
  };