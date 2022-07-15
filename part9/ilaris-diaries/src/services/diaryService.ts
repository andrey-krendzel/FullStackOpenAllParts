import diaries from '../../data/diaries';
import { NonSensitiveDiaryEntry, DiaryEntry } from '../types';


//const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;



const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));
};

const addDiary = () => {
    return null;
  };

  export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries
  };