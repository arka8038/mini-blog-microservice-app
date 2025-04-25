import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body;
  console.log('Received event:', type, data);

  if (type === 'CommentCreated') {
    const { id, postId, content } = data;
    const updatesStatus = content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: { id, postId, content, status: updatesStatus },
    });
  }

  res.send({ status: 'OK' });
});

app.listen(4003, () => {
  console.log('Moderation service is listening on port 4003');
});
