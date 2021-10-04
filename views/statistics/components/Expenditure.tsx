import React, { useState } from "react";
import { Page, List, ListItem, Toggle } from "framework7-react";
import { useExpenditureQuery } from "apollo/graphql/model/statistics.graphql";
import Echarts from "components/Echarts";
import { echartsConfig, onSelectDate } from "../tools";
import { percentage } from "lib/api/utils";
import PercentageItem from "./PercentageItem";

type ExpenditureOptions = { date?: string };
const Expenditure: React.FC<ExpenditureOptions> = ({ date = "" }) => {
  const [toggle, setToggle] = useState(false);
  const { data, refetch } = useExpenditureQuery({
    variables: { date: onSelectDate(date, toggle) }
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
      original: detail.pay,
      value: percentage(original, index),
      icon: detail.expenseIcon
    };
  });

  const option = echartsConfig(echartsData, "支出分析");
  const onToggleChange = (e: boolean) => {
    setToggle(!e);
    refetch({ date: onSelectDate(date, !e) });
  };

  return (
    <Page>
      <div className="px-6">
        <Echarts className="shadow-3 rounded-lg mt-7 p-4" option={option} />

        <List
          simpleList
          noHairlines
          className="test-statistics shadow-3 rounded-lg mt-14 mb-0"
        >
          <ListItem className="py-7">
            <span className="text-gray-600 text-sm">全年比例</span>
            <Toggle
              className="h-4"
              checked={toggle}
              onToggleChange={onToggleChange}
            />
          </ListItem>
        </List>

        <section className="mt-6">
          {percentageDetails.map((item, index) => (
            <PercentageItem
              icon={item.icon}
              progress={item.value}
              name={item.name}
              index={index}
              key={index}
            />
          ))}
        </section>
      </div>
    </Page>
  );
};

export default Expenditure;