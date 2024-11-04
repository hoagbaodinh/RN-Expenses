import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Input from '@/components/ManageExpense/Input';
import Button from '../UI/Button';
import { ExpensesType, IExpenseData } from '@/types/types';
import { Alert } from 'react-native';
import { GlobalStyles } from '@/constants/styles';

interface IInputValue {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
}

interface IProps {
  submitLabel: string;
  onSubmit: (expenseData: IExpenseData) => void;
  onCancel: () => void;
  defaultValue?: ExpensesType;
}

const ExpenseForm = ({
  submitLabel,
  onCancel,
  onSubmit,
  defaultValue,
}: IProps) => {
  const [inputs, setInputs] = useState<IInputValue>({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : '',
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true,
    },
  });

  const inputChangedHandler = (
    inputIdentifier: string,
    enteredValue: string
  ) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevState) => ({
        ...prevState,
        amount: { value: prevState.amount.value, isValid: amountIsValid },
        date: { value: prevState.date.value, isValid: dateIsValid },
        description: {
          value: prevState.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label={'Amount'}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label={'Date'}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label={'Description'}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
