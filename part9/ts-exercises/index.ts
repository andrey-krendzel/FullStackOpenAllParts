import express = require('express');
import calculateBmiParameters from './bmiCalculator';
const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
  });

  app.get('/hello', (_req, res) => {
    res.send('hello full stack');
  });

  app.get('/bmi', (req, res) => {
    var height = Number(req.query.height);
    var weight = Number(req.query.weight);




if (isNaN(weight) || isNaN(height) || weight === 0 || height === 0) {
  res
  .status(400)
  .json({ message: "malformatted parameters" })
} else {
  res.send(calculateBmiParameters(height, weight));
}
}
);
  
  const PORT = 3003;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });