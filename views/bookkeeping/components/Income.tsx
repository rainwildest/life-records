import React, { Fragment, memo } from "react";

import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";
import { group } from "../tool";
import ExpensesItems from "./ExpensesItems";

type PayOptions = {
  onSelected?: (val: LivingExpensesOption & IDSQLOption) => void;
};
const Income: React.FC<PayOptions> = ({ onSelected }) => {
  const { loading, data } = useLivingExpensesQuery({
    variables: { type: "income" }
  });

  const payDetails = group(data?.livingExpenses || [], 20);
  return (
    <Fragment>
      {!loading && <ExpensesItems data={payDetails} onSelected={onSelected} />}
    </Fragment>
  );
};

export default memo(Income);
