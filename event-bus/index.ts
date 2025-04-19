import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

app.post('/events', (req: Request, res: Response) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.error('Error sending event to posts service', err.message);
  });

  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.error('Error sending event to comments service', err.message);
  });

  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.error('Error sending event to query service', err.message);
  });

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Event bus listening on port 4005');
});
