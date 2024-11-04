import { PayloadAction } from './../../node_modules/@reduxjs/toolkit/src/createAction';
import { ExpensesType, IExpenseData } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

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
    date: new Date('2024-10-27'),
  },
];

type StateType = {
  expenses: ExpensesType[];
};

const initialState: StateType = {
  expenses: DUMMY_EXPENSES,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<{ data: IExpenseData }>) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses = [{ ...action.payload.data, id: id }, ...state.expenses];
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
    },
    editExpense: (
      state,
      action: PayloadAction<{ id: string; data: IExpenseData }>
    ) => {
      const updateExpenseIndex = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      const updateExpense = state.expenses[updateExpenseIndex];
      const updatedItem = { ...updateExpense, ...action.payload.data };
      const updatedExpenses = [...state.expenses];
      updatedExpenses[updateExpenseIndex] = updatedItem;
      state.expenses = updatedExpenses;
    },
  },
});

export const { addExpense, removeExpense, editExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
