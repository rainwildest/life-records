import React, { Fragment, useEffect, memo } from "react";
import { RouterOpotions } from "typings/f7-route";
import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";
import Icons from "components/Icons";
import event from "lib/api/framework-event";

type PayOptons = { onNavigate?: () => void };
const Pay: React.FC<RouterOpotions & PayOptons> = ({ f7router, onNavigate }) => {
  const { loading, data, refetch } = useLivingExpensesQuery();

  const payDetails = data?.livingExpenses || [];

  useEffect(() => {
    event.on("update-pay-classification", () => {
      refetch();
    });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-5">
      {payDetails.map((item) => (
        <div className="shadow-3 rounded-lg text-center py-3" key={item.id}>
          <Icons name="calendar" className="svg-icon-30" />
          <div className="text-xs mt-1">{item.expenseName}</div>
        </div>
      ))}
      <div className="shadow-3 rounded-lg text-center py-5 flex items-center justify-center link" onClick={onNavigate}>
        <Icons name="add" className="svg-icon-33" />
      </div>
    </div>
  );
};

export default memo(Pay);
