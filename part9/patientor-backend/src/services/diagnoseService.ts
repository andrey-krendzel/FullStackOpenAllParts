import diagnoses from '../../data/diagnoses';
import { NonLatinDiagnose, Diagnose } from '../types';


const getEntries = (): Diagnose[] => {
    return diagnoses;
};

const getNonLatinDiagnoses = (): NonLatinDiagnose[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name
  }));
};

const addEntry = () => {
    return null;
  };

  export default {
    getEntries,
    addEntry,
    getNonLatinDiagnoses
  };