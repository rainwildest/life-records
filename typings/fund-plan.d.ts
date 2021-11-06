declare type FundPlanOptions = {
  expenseId: string;
  userId: string;
  name: string;
  amounts: number;
  approximateAt: Date;
  completeAt: Date;
};

declare type FundPlanSnakeOptions = {
  expense_id: string;
  user_id: string;
  name: string;
  amounts: number;
  approximate_at: Date;
  complete_at: Date;
};
