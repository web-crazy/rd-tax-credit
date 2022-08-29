import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import projectRouter from '../routes/project';
import expenseRouter from '../routes/expense';

const app = express();

// Middlewares...
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

// Routes...
app.use('/api/project', projectRouter);
app.use('/api/expense', expenseRouter);

export { app };
