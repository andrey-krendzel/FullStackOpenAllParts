import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
  });

router.get('/:id', (req, res) => {
  const patientEntry = patientService.findById(req.params.id);

  if (patientEntry){
    res.send(patientEntry);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addEntry(newPatientEntry); 
    res.json(addedEntry);
    
  } catch (error:unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error){
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});


  export default router;