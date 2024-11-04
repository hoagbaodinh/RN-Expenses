import { ExpensesType } from '@/types/types';
import { createContext, ReactNode, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2024-10-15'),
  },
  {
    id: 'e2',
    description: 'A pair of gloves',
    amount: 29.99,
    date: new Date('2024-9-15'),
  },
  {
    id: 'e3',
    description: 'Apples',
    amount: 19.99,
    date: new Date('2024-9-20'),
  },
  {
    id: 'e4',
    description: 'Books',
    amount: 9.99,
    date: new Date('2024-11-20'),
  },
];

enum ExpenseActionKind {
  ADD = 'ADD',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
}

interface IExpenseData {
  description: string;
  amount: number;
  date: Date;
}

interface ExpenseAction {
  type: ExpenseActionKind;
  payload: any;
}

type ExpenseContextType = {
  expenses: ExpensesType[];
  addExpense: ({ description, amount, date }: IExpenseData) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (
    id: string,
    { description, amount, date }: IExpenseData
  ) => void;
};

export const ExpensesContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: ({ description, amount, date }: IExpenseData) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    { description, amount, date }: IExpenseData
  ) => {},
});

const expensesReducer = (state: ExpensesType[], action: ExpenseAction) => {
  switch (action.type) {
    case ExpenseActionKind.ADD:
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case ExpenseActionKind.UPDATE:
      const updateExpenseIndex = state.findIndex(
        (exp) => exp.id === action.payload.id
      );
      const updateExpense = state[updateExpenseIndex];
      const updatedItem = { ...updateExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateExpenseIndex] = updatedItem;
      return updatedExpenses;
    case ExpenseActionKind.DELETE:
      return state.filter((exp) => exp.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }: { children: ReactNode }) => {
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData: IExpenseData) => {
    dispatch({ type: ExpenseActionKind.ADD, payload: expenseData });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: ExpenseActionKind.DELETE, payload: id });
  };

  const updateExpense = (id: string, expenseData: IExpenseData) => {
    dispatch({
      type: ExpenseActionKind.UPDATE,
      payload: { id: id, data: expenseData },
    });
  };

  const value = {
    expenses: expenseState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
