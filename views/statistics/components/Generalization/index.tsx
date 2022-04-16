import React, { memo } from "react";
import { useGeneralizationQuery } from "apollo/graphql/model/statistics.graphql";
import Echarts from "components/Echarts";

type GeneralizationOptions = { year: string };
const Generalization: React.FC<GeneralizationOptions> = ({ year }) => {
  const { data } = useGeneralizationQuery({ variables: { year } });
  const generalization = data?.statisticalGeneralization || [];

  const paySeries = new Array(12).fill(0);
  const incomeSeries = new Array(12).fill(0);

  generalization.forEach((item) => {
    const month = item.purchaseTime.split("-")[1];
    const index = Number(month) - 1;

    paySeries[index] = item.pay;
    incomeSeries[index] = item.income;
  });

  const option = {
    title: {
      // text: 'Referer of a Website',
      subtext: "单位：元",
      left: "right"
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["收入", "支出"]
    },
    grid: {
      left: "0%",
      right: "2%",
      bottom: "7%",
      top: "24%",
      containLabel: true
    },
    xAxis: {
      data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
    },
    yAxis: {
      type: "value",
      axisLabel: {
        rotate: 0,
        interval: "auto"
      }
    },
    series: [
      {
        name: "收入",
        type: "line",
        data: incomeSeries,
        smooth: true,
        itemStyle: {
          color: "#102b6a"
        },
        areaStyle: {}
      },
      {
        name: "支出",
        type: "line",
        data: paySeries,
        smooth: true,
        itemStyle: {
          color: "#2a5caa"
        },
        areaStyle: {}
      }
    ]
  };

  return (
    <div className="px-6 mb-10">
      <Echarts className="shadow-3 rounded-lg mt-7 p-4" option={option} />
    </div>
  );
};

export default memo(Generalization);
