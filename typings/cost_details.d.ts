declare type CostDetailsOption = {
  userId?: string;
  expenseID?: string;
  expensePrice?: number;
  purchaseTime?: Date;
} & SQLFieldOption;
