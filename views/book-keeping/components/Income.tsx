import React, { Fragment, memo, useEffect } from "react";

import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";
import { group } from "../tool";
import ExpensesItems from "./ExpensesItems";

type Options = LivingExpensesOptions & DateAndIdSQLFieldOption;
type PayOptions = {
  onSelected?: (val?: { [key: string]: Options }) => void;
};
const Income: React.FC<PayOptions> = ({ onSelected }) => {
  const { loading, data } = useLivingExpensesQuery({
    variables: { type: "income" }
  });

  const incomeDetails = group(data?.livingExpenses || [], 20);

  return (
    <Fragment>
      {!loading && (
        <ExpensesItems
          data={incomeDetails}
          type="income"
          onSelected={onSelected}
        />
      )}
    </Fragment>
  );
};

export default memo(Income);
