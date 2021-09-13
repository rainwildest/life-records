declare type LivingExpensesOption = {
  userId?: string;
  expenseIcon?: string;
  expenseType: string;
  expenseName: string;
} & DateSQLOption;
