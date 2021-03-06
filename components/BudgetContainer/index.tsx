import React, { memo, useState } from "react";
import { StatisticalBudget } from "@graphql-types@";
import BudgetsDetails from "../BudgetsDetails";
import { thousands } from "lib/apis/utils";
import ClassificationEmpty from "../ClassificationEmpty";

type BudgetContainerProps = {
  details?: Array<StatisticalBudget>;
};

const BudgetContainer: React.FC<BudgetContainerProps> = ({ details }) => {
  const [showAll, setShowAll] = useState(false);

  const budgetData = details.map((item) => {
    const progress = ((item.amounts / item.original) * 100).toFixed(2);

    return { ...item, progress: parseFloat(progress) };
  });

  const onShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="shadow-3 rounded-lg mt-8 pt-3 pb-4">
      <div className="font-medium text-base mb-3 px-4">已用预算</div>

      <div className={`px-2 overflow-hidden min-h-61 ${!showAll ? "max-h-61" : "h-auto"}`}>
        {!budgetData.length && <ClassificationEmpty className="pt-9" text="暂无已用预算" src="/images/menhera-03.webp" />}

        {budgetData.map((item) => (
          <BudgetsDetails
            name={item.expenseName}
            original={thousands(item.original)}
            amount={thousands(item.amounts)}
            icon={item.expenseIcon}
            progress={item.progress}
            key={item.expenseName}
          />
        ))}
      </div>

      {budgetData.length > 3 && (
        <div className="text-center text-sm text-gray-700 py-2 rounded-lg mx-4 mt-3 shadow-2 shadow-active-2" onClick={onShowAll}>
          <span>{!showAll ? "展开全部" : "收取全部"}</span>
          {!showAll && <i className="f7-icons !text-sm pl-1">chevron_down</i>}
          {showAll && <i className="f7-icons !text-sm pl-1">chevron_up</i>}
        </div>
      )}
    </div>
  );
};

export default memo(BudgetContainer);
