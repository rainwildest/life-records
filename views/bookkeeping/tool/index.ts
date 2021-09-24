type Options = LivingExpensesOptions & IDSQLOptions;

export const group = (value: any[], group = 5): Array<Options[]> => {
  const items: Array<Options[]> = [];
  let sub: Array<Options> = [];

  value?.forEach((item, index) => {
    const isDone = index === value.length - 1;
    if ((index !== 0 && index % group === 0) || isDone) {
      if (isDone) sub.push(item);
      items.push(sub);
      sub = [];

      if (isDone) return;
    }
    sub.push(item);
  });

  return items;
};
