import React from "react";
import { Echarts } from "components";
import { getCurrentDate, getDaysInMonth } from "lib/apis/dayjs";
import { thousands } from "lib/apis/utils";

const monthInDays = () => {
  const month = getCurrentDate("MM");
  const day = getDaysInMonth();
  const days: Array<string> = [];
  for (let i = 0; i < day; ++i) {
    days.push(i < 9 ? `${month}-0${i + 1}` : `${month}-${i + 1}`);
  }

  return days;
};

type PaymentAnalysisProps = {
  days: string[];
  type?: "pay" | "income";
};
const PaymentAnalysis: React.FC<PaymentAnalysisProps> = ({ days, type = "pay" }) => {
  return (
    <Echarts
      className="px-3 py-3 mt-6"
      style={{ height: "12rem" }}
      option={{
        tooltip: {
          trigger: "axis",
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
          },
          formatter: function (params) {
            const max = Math.max.apply(null, [...days]);
            return `<div>
                      <div>
                        <span>${params[1].name}日</span>
                        <span class="text-xs">${max === params[1].data ? `(${type === "pay" ? "支出" : "收入"}最多)` : ""}</span>
                      </div>
                      <div class="flex items-center pt-2">
                        <span class="inline-block w-3 h-3 rounded-full mr-2" style="background: ${params[1].color}"></span>
                        <span class="text-xs font-semibold">
                          ${type === "pay" ? "支出" : "收入"}￥${thousands(params[1].data) || 0}
                        </span>
                      </div>
                    </div>`;
          }
        },
        xAxis: {
          type: "category",
          data: monthInDays()
        },
        yAxis: {
          type: "value"
        },
        grid: {
          left: "0%",
          right: "2%",
          bottom: "0%",
          top: "3%",
          containLabel: true
        },
        series: [
          {
            data: days,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              opacity: 0
            }
          },
          {
            type: "line",
            data: days,
            itemStyle: {
              color: "#2a5caa"
            },
            smooth: true,
            showSymbol: false
          }
        ]
      }}
    />
  );
};

export default PaymentAnalysis;
