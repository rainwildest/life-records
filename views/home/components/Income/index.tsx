import React from "react";
import { useIncomeQuery } from "graphql/model/statistics.graphql";
import { getCurrentDate } from "lib/apis/dayjs";
import { percentage } from "lib/apis/utils";
import ClassificationDetails from "../ClassificationDetails";

const Income: React.FC = () => {
  const { data, refetch } = useIncomeQuery({
    variables: { date: getCurrentDate("YYYY-MM") }
  });

  const details = data?.statisticalExpenditureOrIncome || [];
  const original = [];

  details.forEach((detail) => original.push(detail.income));

  const percentageDetails = details.map((detail, index) => {
    return {
      amount: detail.income,
      name: detail.expenseName,
      icon: detail.expenseIcon,
      progress: percentage(original, index)
    };
  });

  return (
    <div className="shadow-3 rounded-lg mt-8 pt-3 pb-4">
      <div className="font-medium text-base mb-4 px-4">收入分类</div>

      <div className="px-2">
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
    </div>
  );
};

export default Income;
