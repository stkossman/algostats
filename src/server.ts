import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import codewarsRoutes from './routes/codewars.routes.js';
import leetcodeRoutes from './routes/leetcode.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/cw', codewarsRoutes);
app.use('/api/lc', leetcodeRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Algostats Hub API is running',
    endpoints: {
      codewars: '/api/cw/:username',
      leetcode: '/api/lc/:username',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
