declare type CostDetailsOption = {
  userId?: string;
  expenseId: string;
  expensePrice: number;
  purchaseTime?: Date;
} & DateSQLOption;
