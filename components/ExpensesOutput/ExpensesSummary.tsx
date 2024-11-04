import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ExpensesType } from '@/types/types';
import { GlobalStyles } from '@/constants/styles';

interface IProps {
  expenses: ExpensesType[];
  periodName: string;
}

const ExpensesSummary = ({ expenses, periodName }: IProps) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});
