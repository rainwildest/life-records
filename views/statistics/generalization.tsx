import React, { useEffect, useState, useRef, createRef, memo } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  NavLeft,
  f7ready,
  Popover,
  Subnavbar,
  Segmented,
  Tabs,
  Tab,
  Button,
  Link,
  Popup,
  View
} from "framework7-react";
import { Bar, Pie } from "react-roughviz";
import ReactEcharts from "echarts-for-react";
import { Line } from "@ant-design/charts";
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 }
];

const config = {
  data,
  width: 800,
  height: 400,
  autoFit: false,
  xField: "year",
  yField: "value",
  point: {
    size: 5,
    shape: "diamond"
  },
  label: {
    style: {
      fill: "#aaa"
    }
  }
};
const Generalization: React.FC = () => {
  const [show, setShow] = useState(false);
  console.log("kkjk");
  useEffect(() => {
    setShow(!!window);
  }, []);

  return (
    <Page>
      <ReactEcharts
        // onEvents={{ click: (e) => null }}
        opts={{ renderer: "svg", width: "auto" }}
        style={{ width: "100vw" }}
        option={{
          // title: {
          //   text: "ECharts 入门示例"
          // },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["销量", "库存"]
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "line",
              data: [5, 20, 36, 10, 10, 20],
              smooth: true
            },
            {
              name: "库存",
              type: "line",
              data: [15, 120, 6, 40, 110, 20],
              smooth: true
            }
          ]
        }}
      />
      {!!show && (
        <>
          {/* <Line
            {...config}
            onReady={(chartInstance) => (chart = chartInstance)}
          /> */}
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
      )}
    </Page>
  );
};

export default memo(Generalization);
