import React, { useEffect, useRef, useState, Fragment } from "react";
import { f7ready } from "framework7-react";
import Icons from "../Icons";

type CalcOption = {
  date?: string;
  onClickCalendar?: () => void;
  onConfirm?: (value: { amounts: number; remarks: string }) => void;
};
const Calc: React.FC<CalcOption> = ({ date, onClickCalendar, onConfirm }) => {
  const [remarks, setRemarks] = useState("");
  /* 显示的信息 */
  const [display, setDisplay] = useState("0");
  /* 运算状态 */
  const [operationState, setOperationState] = useState(false);
  const [nextShowPoint, setNextShowPoint] = useState(false);

  const calcParams = [
    { name: 1, code: 1 },
    { name: 2, code: 2 },
    { name: 3, code: 3 },
    { name: "×", code: "multiplication" },
    { name: 4, code: 4 },
    { name: 5, code: 5 },
    { name: 6, code: 6 },
    { name: "＋", code: "addition" },
    { name: 7, code: 7 },
    { name: 8, code: 8 },
    { name: 9, code: 9 },
    { name: "－", code: "subtraction" },
    { name: ".", code: "." },
    { name: 0, code: 0 },
    { name: "清空", code: "clear" }
  ];

  /**
   * 判断运算公式对不对
   * @param {string} value 检查的值
   * @returns boolean
   */
  const correctOperation = (value: string) => {
    /* 检验最后是否包含运算符 */
    if (lastOperation(value)) return false;
    // const isRational = /(×|＋|－)/.test(value);
    return /(×|＋|－)/.test(value);
  };

  /* 获取运算符 */
  const getOperation = (value: string) => value.match(/(×|＋|－)/g)[0];

  /* 替换字符串最后运算符 */
  const operationReplace = (value: string, operation: "×" | "＋" | "－" | "") =>
    value.replace(/(×|＋|－){1}$/, operation);

  /* 检验字符串最后是否包含运算符 */
  const lastOperation = (value: string) => /(×|＋|－)$/.test(value);

  /* 检验数字是否符合格式 */
  const verifyNumber = (value: string) =>
    /^([-]{0,1}((0{0,1}\.{0,1})|([1-9]*\.))[0-9]*)$/.test(value);

  /* 运算结果 */
  const operationResolve = (value: string): number | null => {
    const operator = getOperation(value);
    if (correctOperation(value)) {
      let calc = 0;
      if (operator) {
        const values = value.split(operator);
        switch (operator) {
          case "＋":
            calc = parseFloat(
              (Number(values[0]) + Number(values[1])).toFixed(10)
            );
            break;
          case "－":
            calc = parseFloat(
              (Number(values[0]) - Number(values[1])).toFixed(10)
            );
            break;
          case "×":
            calc = parseFloat(
              (Number(values[0]) * Number(values[1])).toFixed(10)
            );
        }
      }

      return calc;
    } else {
      console.error("请正确运算");
      return null;
    }
  };

  const handleOperator = (display: string, operation: "×" | "＋" | "－") => {
    let formula = "";
    if (lastOperation(display)) {
      const replace = operationReplace(display, operation);
      formula = `${replace}`;
    } else {
      if (correctOperation(display)) {
        const value = operationResolve(display);
        if (value !== null) formula = `${value}${operation}`;
      } else {
        formula = `${display}${operation}`;
      }
    }

    if (!operationState) setOperationState(true);
    setDisplay(formula);
  };

  const completeResolve = () => {
    /* 处理运算 */
    if (operationState) {
      let formula = display;
      if (lastOperation(display)) {
        const operation = getOperation(display);
        const values = display.split(operation);
        formula = `${display}${values[0]}`;
      }
      const calc = operationResolve(formula);
      setDisplay(`${calc}`);
      setOperationState(false);
    } else {
      /* 提交结果 */
      const amounts = parseFloat(Number(display).toFixed(10));
      if (onConfirm) onConfirm({ amounts, remarks });
    }
  };

  const handleNumber = (code: string | number): void => {
    const operations = [
      "multiplication",
      "addition",
      "subtraction",
      "clear",
      "complete"
    ];

    if (operations.includes(code as string)) {
      switch (code) {
        case "addition":
          handleOperator(display, "＋");
          break;
        case "subtraction":
          handleOperator(display, "－");
          break;
        case "multiplication":
          handleOperator(display, "×");
          break;
        case "clear":
          setDisplay("0");
          setOperationState(false);
          setNextShowPoint(false);
          break;
        case "complete":
          completeResolve();
          break;
      }
      return;
    }

    /* 如果初始化是0，则下一次输入才显示 . */
    if (display === "0" && code === "0") return;
    const info =
      display === "0" && code !== "." ? `${code}` : `${display}${code}`;

    if (lastOperation(info)) {
      const operator = getOperation(info);
      const num = operationReplace(operator, "");

      if (!verifyNumber(num)) return;
    } else {
      const hasOperator = /(×|＋|－)/.test(info);
      let param = info;

      /* 校验第二个参数 */
      if (hasOperator) {
        const operator = getOperation(info);
        const values = info.split(operator);
        param = values[1];
      }

      if (!verifyNumber(param)) return;
    }

    setDisplay(info);
    if (nextShowPoint) setNextShowPoint(false);
  };

  const onCalendar = () => {
    if (onClickCalendar) onClickCalendar();
  };

  return (
    <Fragment>
      <wired-card
        fill="white"
        class="w-full py-1 px-3"
        onClick={() => {
          f7ready((f7) => {
            f7.dialog.prompt(
              "",
              "备注",
              (val) => {
                setRemarks(val);
              },
              () => {
                return null;
              },
              remarks
            );
          });
        }}
      >
        <div className="h-6 flex justify-between items-center ">
          <div className="pr-3 flex-shrink-0">备注</div>
          <div className="overflow-scrolling whitespace-nowrap overflow-x-auto py-8">
            {remarks}
          </div>
        </div>
      </wired-card>
      {/* scrollIntoView 滚到最底部 */}
      <wired-card fill="white" class="w-full mt-2 py-2">
        <div className="h-7 flex justify-between items-center overflow-hidden">
          {!!date && (
            <div
              className="flex-shrink-0 pr-4 flex items-center"
              onClick={onCalendar}
            >
              <div className="pr-1 pt-1">
                <Icons name="calendar" className="calc-calendar" />
              </div>
              <div className="text-xs">{date}</div>
            </div>
          )}

          <div className="overflow-scrolling whitespace-nowrap overflow-x-auto font-bold py-8">
            {display}
          </div>
        </div>
      </wired-card>
      <div className="grid grid-cols-4 gap-1 pb-2 pt-2">
        {calcParams.map((item) => {
          return (
            <wired-card
              elevation="2"
              class="text-center font-bold py-3"
              key={item.code}
              onClick={() => handleNumber(item.code)}
            >
              {item.name}
            </wired-card>
          );
        })}
        <wired-card
          elevation="2"
          class="text-center font-bold py-3"
          onClick={() => handleNumber("complete")}
        >
          {operationState ? "=" : "完成"}
        </wired-card>
      </div>
    </Fragment>
  );
};

export default Calc;
