import React, { memo } from "react";
import { PageContent, BlockTitle } from "framework7-react";
import { useGeneralizationQuery, useGetStatisticalBudgetByYearQuery } from "graphql/model/statistics.graphql";
import { Echarts } from "components";
import { consumeOptions, budgetOptions } from "../../utils";

type GeneralizationOptions = { year: string };
const Generalization: React.FC<GeneralizationOptions> = ({ year }) => {
  const { data } = useGeneralizationQuery({ variables: { year } });
  const generalization = data?.statisticalGeneralization || [];

  const { data: budgetMonth } = useGetStatisticalBudgetByYearQuery({ variables: { date: year } });
  const budget = budgetMonth?.statisticalBudgetByYear || [];

  return (
    <PageContent>
      <div className="px-4 mb-10 mt-7 w-full">
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
