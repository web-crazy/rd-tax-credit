import express from 'express';
import expenseController from '../controllers/expense.controller';

const expenseRouter = express.Router();

expenseRouter.get('/:id', expenseController.get);
expenseRouter.get('/', expenseController.list);

export default expenseRouter;
