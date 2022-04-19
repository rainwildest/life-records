import React, { useEffect, memo } from "react";
import { RouterOpotions } from "typings/f7-route";
import { useLivingExpensesQuery } from "graphql/model/living-expenses.graphql";
import Icons from "components/Icons";
import event from "lib/apis/framework-event";

type PayOptons = { onNavigate?: (event?: any) => void };
const Pay: React.FC<RouterOpotions & PayOptons> = ({ f7router, onNavigate }) => {
  const { loading, data, refetch } = useLivingExpensesQuery();

  const payDetails = data?.livingExpenses || [];

  useEffect(() => {
    event.on("update-pay-classification", () => {
      refetch();
    });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-6">
      {payDetails.map((item) => (
        <div
          className={`relative shadow-3 rounded-lg text-center py-2 overflow-hidden ${item.userId ? "shadow-active-3" : ""}`}
          data-id={item.id}
          key={item.id}
          onClick={item.userId && onNavigate}
        >
          {!item.userId && (
            <div className="absolute top-0 left-0 w-7 h-7 lock-icon-tip">
              <Icons name="lock-01" className="svg-icon-12 pointer-events-none absolute z-10 left-0.5 top-0.5" />
            </div>
          )}

          <Icons
            name={item.expenseIcon || "default-01"}
            className={`svg-icon-30 pointer-events-none ${!item.expenseIcon ? "default-icon-color" : ""}`}
          />
          <div className="text-xs mt-1 pointer-events-none">{item.expenseName}</div>
        </div>
      ))}
      <div className="shadow-3 shadow-active-3 rounded-lg text-center py-4 flex items-center justify-center" onClick={onNavigate}>
        <Icons name="add-01" className="svg-icon-33" />
      </div>
    </div>
  );
};

export default memo(Pay);
