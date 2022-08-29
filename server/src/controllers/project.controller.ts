import { Request, Response } from 'express';

const Projects = [
  {
    id: '1',
    name: 'Project 1',
    expense: 'Hello',
    expenseId: '1',
    createdAt: '2021-12-20',
  },
  {
    id: '2',
    name: 'Project 2',
    expense: 'DataGrid',
    expenseId: '2',
    createdAt: '2022-01-01',
  },
  {
    id: '3',
    name: 'Project 3',
    expense: 'MUI',
    expenseId: '3',
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

export default { get, list };
