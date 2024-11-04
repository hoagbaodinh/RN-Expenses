import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExpensesSummary from '@/components/ExpensesOutput/ExpensesSummary';
import ExpensesList from '@/components/ExpensesOutput/ExpensesList';
import { ExpensesType } from '@/types/types';
import { GlobalStyles } from '@/constants/styles';

interface IProps {
  expenses: ExpensesType[];
  expensesPeriod: string;
  fallbackText: string;
}
const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }: IProps) => {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,

    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbackText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 24,
  },
});
