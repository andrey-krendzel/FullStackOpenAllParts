import calculator from './calculator';

import express from 'express';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use(express.json());

const PORT = 3003;

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1))) {    return res.status(400).send({ error: '...'});  }
  // more validations here...

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  return res.status(200).send(result);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});