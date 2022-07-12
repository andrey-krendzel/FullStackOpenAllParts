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

  console.log(req.body);

  


  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercisesServer(target, daily_exercises);

  res.send(result);
});
  
  const PORT = 3003;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });