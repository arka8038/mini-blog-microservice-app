import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Post {
  id: string;
  title: string;
}

const posts: Record<string, Post> = {};

app.get('/posts', (_req: Request, res: Response) => {
  res.status(200).send(Object.values(posts));
});

app.post('/posts', (req: Request<{ title: string }>, res: Response<Post>) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log('Listening on 4000');
});
