import React, { useState, memo } from "react";
import ClassificationEmpty from "../ClassificationEmpty";
import ClassificationDetails from "../ClassificationDetails";
import { thousands, percentage } from "lib/apis/utils";
import { ExpenditureAndIncome } from "@graphql-types@";

type ClassificationContainer = {
  type?: string;
  details?: Array<ExpenditureAndIncome>;
};
const ClassificationContainer: React.FC<ClassificationContainer> = ({ type, details }) => {
  const [showAll, setShowAll] = useState(false);

  const original = [];

  details.forEach((detail) => original.push(type === "pay" ? detail.pay : detail.income));

  const percentageDetails = details.map((detail, index) => {
    const amount = type === "pay" ? detail.pay : detail.income;

    return {
      amount,
      name: detail.expenseName,
      icon: detail.expenseIcon,
      progress: percentage(original, index)
    };
  });

  const onShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="shadow-3 rounded-lg mt-8 pt-3 pb-4">
      <div className="font-medium text-base mb-3 px-4">
        {type === "pay" && "支付分类"}
        {type === "income" && "收入分类"}
      </div>

      <div className={`px-2 overflow-hidden min-h-50.5 ${!showAll ? "max-h-50.5" : "h-auto"}`}>
        {!percentageDetails.length && <ClassificationEmpty text="暂无支出分类" />}

        {percentageDetails.map((item) => {
          return (
            <ClassificationDetails
              name={item.name}
              icon={item.icon}
              amount={thousands(item.amount)}
              progress={item.progress}
              key={item.name}
            />
          );
        })}
      </div>
      {percentageDetails.length > 3 && (
        <div className="text-center text-sm text-gray-700 py-2 rounded-lg mx-4 mt-3 shadow-2 shadow-active-2" onClick={onShowAll}>
          <span>{!showAll ? "展开全部" : "收取全部"}</span>
          {!showAll && <i className="f7-icons !text-sm pl-1">chevron_down</i>}
          {showAll && <i className="f7-icons !text-sm pl-1">chevron_up</i>}
        </div>
      )}
    </div>
  );
};

export default memo(ClassificationContainer);
