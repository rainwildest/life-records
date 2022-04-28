import { EChartsOption } from "echarts-for-react";

export const echartsConfig = (data: any[], name = "支出分析"): EChartsOption => {
  return {
    title: {
      // text: 'Referer of a Website',
      subtext: "单位：元",
      left: "right"
    },
    tooltip: {
      trigger: "item",
      position: function (point, params, dom, rect, size) {
        //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
        const pointX = point[0];
        const pointY = point[1];
        const viewWidth = size.viewSize[0];
        // const viewHeight = size.viewSize[1];
        const boxWidth = size.contentSize[0];
        const boxHeight = size.contentSize[1];
        let posX = 0; //x坐标位置
        let posY = 0; //y坐标位置

        if (pointX < boxWidth) {
          //左边放不开
          posX = 5;
        } else {
          //左边放的下
          posX = pointX > viewWidth - boxWidth ? pointX - boxWidth + 20 : pointX;
        }

        posY = pointY < boxHeight ? 5 /*上边放不开*/ : pointY - boxHeight - 10 /*上边放得下*/;

        return [posX, posY];
      }
    },
    series: [
      {
        name,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2
        },
        data
      }
    ]
  };
};

export const onSelectDate = (date: string, fullYear = false): string => {
  if (!fullYear) return date;

  return date.split("-")[0];
};

export const consumeOptions = (data: FieldCommon[]): FieldCommon => {
  const paySeries = new Array(12).fill(0);
  const incomeSeries = new Array(12).fill(0);

  data.forEach((item) => {
    const month = item.purchaseTime.split("-")[1];
    const index = Number(month) - 1;

    paySeries[index] = item.pay;
    incomeSeries[index] = item.income;
  });

  return {
    title: {
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
};

export const budgetOptions = (data: FieldCommon[]): FieldCommon => {
  const budgetSeries = new Array(12).fill(0);
  const expenditureSeries = new Array(12).fill(0);

  data.forEach((item) => {
    const index = Number(item.createdAt) - 1;

    budgetSeries[index] = item.budgetTotal || 0;
    expenditureSeries[index] = item.monthTotal || 0;
  });

  return {
    title: {
      subtext: "单位：元",
      left: "right"
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["预算", "支出"]
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
        name: "预算",
        type: "line",
        data: budgetSeries,
        smooth: true,
        itemStyle: {
          color: "#be185d"
        },
        areaStyle: {}
      },
      {
        name: "支出",
        type: "line",
        data: expenditureSeries,
        smooth: true,
        itemStyle: {
          color: "#831843"
        },
        areaStyle: {}
      }
    ]
  };
};
