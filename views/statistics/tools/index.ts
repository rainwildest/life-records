import { EChartsOption } from "echarts-for-react";

export const echartsConfig = (
  data: any[],
  name = "支出分析"
): EChartsOption => {
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
          posX =
            pointX > viewWidth - boxWidth ? pointX - boxWidth + 20 : pointX;
        }

        posY =
          pointY < boxHeight
            ? 5 /*上边放不开*/
            : pointY - boxHeight - 10 /*上边放得下*/;

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
