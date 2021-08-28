export declare type SeedCtxOptions = {
  users: string;
  costDetails: string;
  livingExpenses: string;
};

export declare type CtxOptions = {
  [key in keyof SeedCtxOptions]?: { docs: any[]; obj: { [key: string]: any } };
};
