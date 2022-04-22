import React, { useState } from "react";
import { PageContent, List, ListItem, Toggle } from "framework7-react";
import { useGetClassifiedStatisticsQuery } from "graphql/model/statistics.graphql";
import { Echarts } from "components";
import { echartsConfig, onSelectDate } from "../../utils";
import { percentage, thousands } from "lib/apis/utils";
import PercentageItem from "../PercentageItem";
import StatisticsEmpty from "../StatisticsEmpty";

type ExpenditureOptions = { date?: string };
const Expenditure: React.FC<ExpenditureOptions> = ({ date = "" }) => {
  const [toggle, setToggle] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const { data, refetch } = useGetClassifiedStatisticsQuery({
    variables: { date: onSelectDate(date, toggle), type: "pay" }
  });

  const details = data?.statisticalExpenditureOrIncome || [];
  const original = [];

  const echartsData = details.map((detail) => {
    original.push(detail.pay);

    return {
      name: detail.expenseName,
      value: detail.pay
    };
  });

  const percentageDetails = details.map((detail, index) => {
    return {
      name: detail.expenseName,
      amount: detail.pay,
      progress: percentage(original, index),
      icon: detail.expenseIcon
    };
  });

  const option = echartsConfig(echartsData, "支出分析");
  const onToggleChange = (e: boolean) => {
    setToggle(!e);
    refetch({ date: onSelectDate(date, !e) });
  };

  const onShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <PageContent>
      <div className="px-4 pb-10">
        <Echarts className="shadow-3 rounded-lg mt-7 p-4" option={option} />

        <List simpleList noHairlines className="test-statistics shadow-3 rounded-lg mt-14 mb-0">
          <ListItem className="py-7">
            <span className="text-gray-600 text-sm">全年比例</span>
            <Toggle className="h-4" checked={toggle} onToggleChange={onToggleChange} />
          </ListItem>
        </List>

        <section className="shadow-3 rounded-lg mt-8 pt-3 pb-4">
          <div className="font-medium text-base mb-3 px-4">支付分类</div>

          <div className={`px-2 overflow-hidden min-h-50.5 ${!showAll ? "max-h-50.5" : "h-auto"}`}>
            {!percentageDetails.length && <StatisticsEmpty text="暂无支付分类" />}

            {percentageDetails.map((item) => (
              <PercentageItem
                icon={item.icon}
                progress={item.progress}
                name={item.name}
                amount={thousands(item.amount)}
                key={item.name}
              />
            ))}
          </div>

          {percentageDetails.length > 3 && (
            <div
              className="text-center text-sm text-gray-700 py-2 rounded-lg mx-4 mt-3 shadow-2 shadow-active-2"
              onClick={onShowAll}
            >
              <span>{!showAll ? "展开全部" : "收取全部"}</span>
              {!showAll && <i className="f7-icons !text-sm pl-1">chevron_down</i>}
              {showAll && <i className="f7-icons !text-sm pl-1">chevron_up</i>}
            </div>
          )}
        </section>
      </div>
    </PageContent>
  );
};

export default Expenditure;
