import patients from '../../data/patients';
import { Patient, NonSSNPatient } from '../types';


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

const addEntry = () => {
    return null;
  };

  export default {
    getEntries,
    addEntry,
    getNonSSNEntries
  };