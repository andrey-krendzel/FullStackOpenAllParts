import express = require('express');
import calculateBmiParameters from './bmiCalculator';
import calculateExercisesServer from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong');
  });

  app.get('/hello', (_req, res) => {
    res.send('hello full stack');
  });

  app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);




if (isNaN(weight) || isNaN(height) || weight === 0 || height === 0) {
  res
  .status(400)
  .json({ message: "malformatted parameters" });
} else {
  res.send(calculateBmiParameters(height, weight));
}
}
);

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target){
    return res.status(400).send({ error: 'parameters missing'});
  }

  if (isNaN(Number(target))){
    return res.status(400).send({ error: 'malformatted parameters'});
  }


  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i = 0; i < daily_exercises.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (isNaN(Number(daily_exercises[i]))) {
      return res.status(400).send({ error: 'malformatted parameters'});
    }
}





  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercisesServer(target, daily_exercises);

  return res.status(200).send(result);
});
  
  const PORT = 3003;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });