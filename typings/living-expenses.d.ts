declare type LivingExpensesOption = {
  userId?: string;
  expenseType?: string;
  expenseName?: string;
} & DateSQLOption;
