import { Request, Response } from 'express';

const Expenses = [
  { id: '1', name: 'Hello', amount: 100, isQualified: true },
  { id: '2', name: 'DataGrid', amount: 200, isQualified: true },
  { id: '3', name: 'MUI', amount: 400, isQualified: true },
];

const get = (req: Request, res: Response): void => {
  const { id } = req.params;
  const expense = Expenses.find(item => item.id == id);
  res.status(200).json(expense);
};

const list = (req: Request, res: Response): void => {
  console.log('Request: ', req);
  res.status(200).json(Expenses);
};

export default { get, list };
