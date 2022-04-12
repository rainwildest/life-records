import React, { Fragment, memo } from "react";

import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";

const Pay: React.FC = () => {
  const { loading, data } = useLivingExpensesQuery();
  const payDetails = data?.livingExpenses || [];

  console.log(payDetails);
  return <div>kkkk</div>;
};

export default memo(Pay);
