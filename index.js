import express from 'express';
import router from './routes/user.js';

const app = express();
app.use(express.json());
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Welcome to the Minimal Blogging Platform API');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
