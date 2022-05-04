import React, { useState } from "react";
import { PageContent, List, ListItem, Toggle } from "framework7-react";
import { useGetClassifiedStatisticsQuery, useGetStatisticalBudgetQuery } from "graphql/model/statistics.graphql";
import { Echarts, ClassificationContainer, BudgetContainer } from "components";
import { echartsConfig, onSelectDate } from "../../utils";

type ExpenditureOptions = { date?: string };
const Expenditure: React.FC<ExpenditureOptions> = ({ date = "" }) => {
  const [toggle, setToggle] = useState(false);

  const { data, refetch } = useGetClassifiedStatisticsQuery({
    variables: { date: onSelectDate(date, toggle), type: "pay" }
  });

  const details = data?.statisticalExpenditureOrIncome || [];

  const echartsData = details.map((detail) => ({
    name: detail.expenseName,
    value: detail.pay
  }));

  const { data: budgetsData, refetch: budgetsRefetch } = useGetStatisticalBudgetQuery({
    variables: {
      input: { date: onSelectDate(date, toggle) }
    },
    fetchPolicy: "network-only"
  });

  const option = echartsConfig(echartsData, "支出分析");
  const onToggleChange = (e: boolean) => {
    setToggle(!e);
    refetch({ date: onSelectDate(date, !e) });
  };

  const onRefresh = (done: () => void) => {
    setTimeout(() => {
      Promise.all([refetch(), budgetsRefetch()]).finally(() => {
        done();
      });
    }, 500);
  };

  return (
    <PageContent className="pt-24" ptr onPtrRefresh={onRefresh}>
      <div className="px-4 pt-4 pb-10">
        <div className="shadow-3 rounded-lg px-3 py-3 flex justify-between items-center mb-5">
          <span className="text-gray-600 text-sm">全年比例</span>
          <Toggle className="h-4 scale-75" checked={toggle} onToggleChange={onToggleChange} />
        </div>

        <Echarts className="shadow-3 rounded-lg p-4" option={option} />

        <ClassificationContainer details={data} type="pay" />

        <BudgetContainer details={budgetsData?.statisticalBudget || []} />
      </div>
    </PageContent>
  );
};

export default Expenditure;
