import { ExpenseType } from './expense';

export type ProjectType = {
  id?: string;
  name?: string;
  expenses?: ExpenseType[];
  expenseId?: string;
  createdAt?: string;
};
