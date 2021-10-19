import React, { Fragment, memo, useEffect } from "react";

import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";
import { group } from "../tool";
import ExpensesItems from "./ExpensesItems";
type Options = LivingExpensesOptions & DateAndIdSQLFieldOption;
type PayOptions = {
  onSelected?: (val?: { [key: string]: Options }) => void;
};
const Pay: React.FC<PayOptions> = ({ onSelected }) => {
  const { loading, data } = useLivingExpensesQuery();
  const payDetails = group(data?.livingExpenses || [], 20);

  return (
    <Fragment>
      {!loading && (
        <ExpensesItems data={payDetails} type="pay" onSelected={onSelected} />
      )}
    </Fragment>
  );
};

export default memo(Pay);
