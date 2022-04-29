import React, { memo } from "react";
import { PageContent, BlockTitle } from "framework7-react";
import { useGeneralizationQuery, useGetStatisticalBudgetByYearQuery } from "graphql/model/statistics.graphql";
import { Echarts } from "components";
import { consumeOptions, budgetOptions } from "../../utils";

type GeneralizationOptions = { year: string };
const Generalization: React.FC<GeneralizationOptions> = ({ year }) => {
  const { data, refetch } = useGeneralizationQuery({ variables: { year } });
  const generalization = data?.statisticalGeneralization || [];

  const { data: budgetMonth, refetch: budgetRefetch } = useGetStatisticalBudgetByYearQuery({ variables: { date: year } });
  const budget = budgetMonth?.statisticalBudgetByYear || [];

  const onRefresh = (done: () => void) => {
    setTimeout(() => {
      Promise.all([refetch(), budgetRefetch()]).finally(() => {
        done();
      });
    }, 500);
  };

  return (
    <PageContent className="pt-24" ptr onPtrRefresh={onRefresh}>
      <div className="px-4 pt-4 mb-10 w-full">
        <BlockTitle className="!mb-3 !mt-0">{year} 收入与支出概况</BlockTitle>
        <Echarts className="shadow-3 rounded-lg p-4 w-full" option={consumeOptions(generalization)} />
      </div>

      <div className="px-4 mb-10 w-full">
        <BlockTitle className="!mb-3 !mt-0">{year} 预算与支出概况</BlockTitle>
        <Echarts className="shadow-3 rounded-lg p-4 w-full" option={budgetOptions(budget)} />
      </div>
    </PageContent>
  );
};

export default memo(Generalization);
