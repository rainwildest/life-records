export declare type SeedCtxOptions = {
  users: string;
  costDetails: string;
  livingExpenses: string;
  accountBooks: string;
  fundPlan: string;
};

export declare type CtxOptions = {
  [key in keyof SeedCtxOptions]?: { docs: any[]; obj: { [key: string]: any } };
};
