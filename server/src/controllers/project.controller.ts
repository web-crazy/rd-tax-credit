import { Request, Response } from 'express';

const Expenses = [
  { id: '1', name: 'Hello', amount: 100, isQualified: true },
  { id: '2', name: 'DataGrid', amount: 200, isQualified: true },
  { id: '3', name: 'MUI 1', amount: 300, isQualified: true },
  { id: '4', name: 'MUI 2', amount: 440, isQualified: true },
  { id: '5', name: 'MUI 3', amount: 40, isQualified: true },
  { id: '6', name: 'MUI 4', amount: 100, isQualified: true },
];

let Projects = [
  {
    id: '1',
    name: 'Project 1',
    expenses: [
      { id: '1', name: 'Hello', amount: 100, isQualified: true },
      { id: '2', name: 'DataGrid', amount: 200, isQualified: true },
      { id: '3', name: 'MUI 1', amount: 300, isQualified: true },
    ],
    createdAt: '2021-12-20',
  },
  {
    id: '2',
    name: 'Project 2',
    expenses: [
      { id: '3', name: 'MUI 1', amount: 300, isQualified: true },
      { id: '4', name: 'MUI 2', amount: 440, isQualified: true },
    ],
    expenseId: '2',
    createdAt: '2022-01-01',
  },
  {
    id: '3',
    name: 'Project 3',
    expenses: [
      { id: '5', name: 'MUI 3', amount: 40, isQualified: true },
      { id: '6', name: 'MUI 4', amount: 100, isQualified: true },
    ],
    createdAt: '2022-01-03',
  },
];

const get = (req: Request, res: Response): void => {
  const { id } = req.params;
  console.log('Project Id: ', id);
  const project = Projects.find(item => item.id === id);
  res.status(200).json(project);
};

const list = (req: Request, res: Response): void => {
  console.log('Request: ', req);
  res.status(200).json(Projects);
};

const create = (req: Request, res: Response): void => {
  const { expenses: expenseIds, ...rest } = req.body;
  const id = new Date().getTime();
  const expenses = Expenses.filter(expense => expenseIds.includes(expense.id));
  // eslint-disable-next-line
  const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  Projects = [...Projects, { id, expenses, createdAt: currentDate, ...rest }];
  res.status(200).json({});
};

const remove = (req: Request, res: Response): void => {
  const { id } = req.params;
  Projects = Projects.filter(item => item.id !== id);
  res.status(200).json({});
};

const update = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { expenses: expenseIds, ...rest } = req.body;
  const expenses = Expenses.filter(item => expenseIds.includes(item.id));
  Projects = Projects.map(item => {
    if (item.id == id) return { ...item, ...rest, expenses };
    return item;
  });
  res.status(200).json({});
};

export default { get, create, remove, update, list };
