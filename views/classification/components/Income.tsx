import React, { Fragment, memo } from "react";

import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";

const Income: React.FC = () => {
  const { loading, data } = useLivingExpensesQuery({
    variables: { type: "income" }
  });

  const incomeDetails = data?.livingExpenses || [];
  console.log(incomeDetails);
  return <div></div>;
};

export default memo(Income);
