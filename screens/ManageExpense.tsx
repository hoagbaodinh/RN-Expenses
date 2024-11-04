import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation/types';
import { RouteProp } from '@react-navigation/native';
import IconButton from '@/components/UI/IconButton';
import { GlobalStyles } from '@/constants/styles';
import Button from '@/components/UI/Button';
// import { ExpensesContext } from '@/store/context/expenses-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExpense,
  editExpense,
  removeExpense,
} from '@/store/redux/expenseSlice';
import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import { IExpenseData } from '@/types/types';
import { RootState } from '@/store/redux';

interface IProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ManageExpense'>;
  route: RouteProp<RootStackParamList, 'ManageExpense'>;
}

const ManageExpense = ({ navigation, route }: IProps) => {
  const expenseId = route.params?.expenseId;
  // const expensesCtx = useContext(ExpensesContext);
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);
  const isEditing = !!expenseId;
  console.log(expenseId);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    // expensesCtx.deleteExpense(expenseId);
    dispatch(removeExpense(expenseId));
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData: IExpenseData) => {
    if (isEditing) {
      // expensesCtx.updateExpense(expenseId, {
      //   description: 'Edit Expense',
      //   amount: 69.69,
      //   date: new Date(),
      // });
      dispatch(
        editExpense({
          id: expenseId,
          data: expenseData,
        })
      );
    } else {
      // expensesCtx.addExpense({
      //   description: 'Add Expense',
      //   amount: 69.69,
      //   date: new Date(),
      // });
      dispatch(
        addExpense({
          data: expenseData,
        })
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteButtonContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteButtonContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
