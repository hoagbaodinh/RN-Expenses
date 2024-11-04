import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { ExpensesType } from '@/types/types';
import ExpenseItem from './ExpenseItem';

interface IProps {
  expenses: ExpensesType[];
}

const ExpensesList = ({ expenses }: IProps) => {
  const renderExpensesItem = (item: ExpensesType) => {
    return <ExpenseItem {...item} />;
  };

  return (
    <FlatList
      data={expenses}
      key={'_'}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderExpensesItem(item)}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
