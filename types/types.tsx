export type ExpensesType = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export interface IExpenseData {
  description: string;
  amount: number;
  date: Date;
}
