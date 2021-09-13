declare type CostDetailsOptions = {
  userId?: string;
  expenseId: string;
  expensePrice: number;
  purchaseTime?: Date;
} & DateSQLOption;

declare type CostDetailsSnakeOptions = {
  user_id: string;
  expense_id: string;
  expense_price: number;
  purchase_time?: Date;
} & DateSQLSnakeOptions;
