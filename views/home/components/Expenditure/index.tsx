import React, { memo } from "react";
import { useExpenditureQuery } from "graphql/model/statistics.graphql";
import { getCurrentDate } from "lib/apis/dayjs";
import { percentage } from "lib/apis/utils";
import ClassificationDetails from "../ClassificationDetails";

const Expenditure: React.FC = () => {
  const { data } = useExpenditureQuery({
    variables: { date: getCurrentDate("YYYY-MM") }
  });

  const details = data?.statisticalExpenditureOrIncome || [];
  const original = [];

  details.forEach((detail) => original.push(detail.pay));

  const percentageDetails = details.map((detail, index) => {
    return {
      amount: detail.pay,
      name: detail.expenseName,
      icon: detail.expenseIcon,
      progress: percentage(original, index)
    };
  });

  return (
    <div className="shadow-3 rounded-lg mt-8 pt-3 pb-4">
      <div className="font-medium text-base mb-3 px-4">支付分类</div>

      <div className="px-2 overflow-hidden max-h-50.5">
        {percentageDetails.map((item) => {
          return (
            <ClassificationDetails
              name={item.name}
              icon={item.icon}
              amount={item.amount}
              progress={item.progress}
              key={item.name}
            />
          );
        })}
      </div>
      <div className="text-center text-sm text-gray-700 py-2 rounded-lg mx-4 mt-3 shadow-2 shadow-active-2">展开全部</div>
    </div>
  );
};

export default memo(Expenditure);
