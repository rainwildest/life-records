declare type CostDetailsProps = {
  userId?: string;
  expenseId: string;
  amounts: number;
  purchaseTime?: Date;
};

declare type CostDetailsSnakeProps = {
  user_id: string;
  expense_id: string;
  amounts: number;
  purchase_time?: Date;
};
