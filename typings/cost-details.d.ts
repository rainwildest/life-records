declare type CostDetailsOptions = {
  userId?: string;
  expenseId: string;
  amounts: number;
  purchaseTime?: Date;
};

declare type CostDetailsSnakeOptions = {
  user_id: string;
  expense_id: string;
  amounts: number;
  purchase_time?: Date;
};
