import React, { Fragment, memo } from "react";

import { useLivingExpensesQuery } from "graphql/model/living-expenses.graphql";
import { group } from "../../utils";
import ExpensesItems from "../ExpensesItems";
type Options = LivingExpensesOptions & DateAndIdSQLFieldOption;
type PayOptions = {
  onSelected?: (val?: { [key: string]: Options }) => void;
};
const Pay: React.FC<PayOptions> = ({ onSelected }) => {
  const { loading, data } = useLivingExpensesQuery();
  const payDetails = group(data?.livingExpenses || [], 20);

  return <Fragment>{!loading && <ExpensesItems data={payDetails} type="pay" onSelected={onSelected} />}</Fragment>;
};

export default memo(Pay);
