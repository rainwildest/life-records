import React, { useEffect, useState, memo } from "react";
import { Page } from "framework7-react";
// import { Bar, Pie } from "react-roughviz";
import { useGeneralizationQuery } from "apollo/graphql/model/statistics.graphql";
import Echarts from "components/Echarts";

const Generalization: React.FC = () => {
  // const [show, setShow] = useState(false);
  const { data } = useGeneralizationQuery();
  const generalization = data?.statisticalGeneralization || [];

  const paySeries = new Array(12).fill(0);
  const incomeSeries = new Array(12).fill(0);

  generalization.forEach((item) => {
    const month = item.purchaseTime.split("-")[1];
    const index = Number(month) - 1;

    paySeries[index] = item.pay;
    incomeSeries[index] = item.income;
  });

  // useEffect(() => {
  //   setShow(!!window);
  // }, []);

  const option = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["收入", "支出"]
    },
    grid: {
      left: "0%",
      right: "2%",
      bottom: "4%",
      top: "20%",
      containLabel: true
    },
    xAxis: {
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]
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
          color: "#a3cf62"
        },
        areaStyle: {}
      },
      {
        name: "支出",
        type: "line",
        data: paySeries,
        smooth: true,
        itemStyle: {
          color: "#ef4136"
        },
        areaStyle: {}
      }
    ]
  };

  return (
    <Page>
      <div className="px-4">
        <Echarts className="shadow-3 rounded-lg mt-4 p-4" option={option} />
      </div>

      {/* {!!show && (
        <>
          <h3>Bar</h3>
          <Bar
            title="Regions"
            data={{
              labels: ["North", "South", "East", "West"],
              values: [10, 5, 8, 3]
            }}
            // labels="flavor"
            // values="price"
          />
          <h3>Pie</h3>
          <Pie
            data={{
              labels: ["North", "South", "East", "West"],
              values: [10, 5, 8, 3]
            }}
            title="Regions"
            colors={["red", "orange", "blue", "skyblue"]}
            roughness={4}
            fillStyle="cross-hatch"
          />
        </>
      )} */}
    </Page>
  );
};

export default memo(Generalization);
