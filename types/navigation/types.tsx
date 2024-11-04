import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  ExpensesOverview: NavigatorScreenParams<ExpensesOverviewParamList>;
  ManageExpense: { expenseId: string };
};

export type ExpensesOverviewParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type ExpensesOverviewTabScreenProps<
  T extends keyof ExpensesOverviewParamList
> = CompositeScreenProps<
  BottomTabScreenProps<ExpensesOverviewParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
