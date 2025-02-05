// import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '@/store/context/expenses-context';
import { getDateMinusDays } from '@/utils/date';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';

const RecentExpenses = () => {
  // const expensesCtx = useContext(ExpensesContext);
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days "
      fallbackText="No expenses in last 7 days found!"
    />
  );
};

export default RecentExpenses;

// const styles = StyleSheet.create({});
