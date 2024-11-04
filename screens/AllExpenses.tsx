import React, { useContext } from 'react';
import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '@/store/context/expenses-context';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';

const AllExpenses = () => {
  // const expensesCtx = useContext(ExpensesContext);
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No expenses found!"
    />
  );
};

export default AllExpenses;
