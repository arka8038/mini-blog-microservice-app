import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

type Post = {
  id: string;
  title: string;
  comments: { id: string; content: string }[];
};

const posts: Record<string, Post> = {};

app.get('/posts', (_req, res) => {
  res.status(200).send(posts);
  console.log('Posts', posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('Received event:', type, data);

  if (type === 'PostCreated') {
    const {
      id,
      title,
      comments: [],
    } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    posts[postId].comments.push({ id, content });
  }

  console.log('Posts', posts);

  res.send({ status: 'OK' });
  console.log(posts);
});

app.listen(4002, () => {
  console.log('Query service listening on port 4002');
});
