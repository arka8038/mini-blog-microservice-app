import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Post {
  id: string;
  title: string;
  comments?: { id: string; content: string }[];
}

// app.get('/posts', (_req: Request, res: Response) => {
//   res.status(200).send(Object.values(posts));
// });

app.post(
  '/posts',
  async (req: Request<{ title: string }>, res: Response<Post>) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: { id, title, comments: [] },
    });

    res.status(201);
  }
);

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body;
  console.log('Received event:', type, data);

  res.send({ status: 'OK' });
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
