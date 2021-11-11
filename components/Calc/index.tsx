import React, { useRef, useState, Fragment } from "react";
import { f7ready } from "framework7-react";
import Icons from "../Icons";
import { thousands } from "lib/api/utils";
import {
  lastOperation,
  correctOperation,
  operationResolve,
  getOperation,
  verifyNumber,
  operationReplace
} from "./tools";

type CalcOption = {
  date?: string;
  onClickCalendar?: () => void;
  onConfirm?: (
    value: { amounts: number; remarks: string },
    clear: () => void
  ) => void;
};
const Calc: React.FC<CalcOption> = ({ date, onClickCalendar, onConfirm }) => {
  const [remarks, setRemarks] = useState("");
  /* 显示的信息 */
  const [display, setDisplay] = useState("0");
  /* 运算状态 */
  const [operationState, setOperationState] = useState(false);
  // const [nextShowPoint, setNextShowPoint] = useState(false);

  const displayRef = useRef<HTMLDivElement>();
  const remarksRef = useRef<HTMLDivElement>();
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
      if (onConfirm) onConfirm({ amounts, remarks }, onClear);
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
          // setNextShowPoint(false);
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
    onScrollLeft(displayRef.current);
    // if (nextShowPoint) setNextShowPoint(false);
  };

  const onCalendar = () => {
    onClickCalendar && onClickCalendar();
  };

  const onShowPrompt = () => {
    f7ready((f7) => {
      f7.dialog.prompt(
        "",
        "备注",
        (val) => {
          setRemarks(val);
          onScrollLeft(remarksRef.current);
        },
        () => {
          return null;
        },
        remarks
      );
    });
  };

  const onDel = () => {
    const len = display.length - 1;
    const str = !len ? "0" : display.substr(0, len);
    setDisplay(str);
  };

  /* 让滚动一直保持在最右边 */
  const onScrollLeft = (element: HTMLElement) => {
    const scrollWidth = element.scrollWidth;
    element.scrollLeft = scrollWidth;
  };

  const onClear = () => {
    setDisplay("0");
  };

  return (
    <Fragment>
      <div
        className="shadow-3 rounded-lg py-5 px-3 text-xs h-6 flex justify-between items-center overflow-hidden"
        onClick={onShowPrompt}
      >
        <div className="pr-3 font-bold flex-shrink-0">备注</div>
        <div
          className="overflow-scrolling whitespace-nowrap overflow-x-auto py-8"
          ref={remarksRef}
        >
          {remarks}
        </div>
      </div>

      <div className="shadow-3 rounded-lg mt-2.5 py-6 pl-3 h-7 flex justify-between items-center overflow-hidden">
        {!!date && (
          <div
            className="flex-shrink-0 pr-4 flex items-center link"
            onClick={onCalendar}
          >
            <div className="pr-1 pt-1">
              <Icons name="calendar" className="calc-calendar" />
            </div>
            <div className="text-xs">{date}</div>
          </div>
        )}

        <div className="test-i relative pl-1 w-full flex overflow-hidden items-center">
          <div
            className="w-full text-right overflow-scrolling whitespace-nowrap overflow-x-auto font-bold py-8"
            ref={displayRef}
          >
            {thousands(display)}
          </div>

          <Icons
            name="delete-01"
            className="calc-delete-icon link pl-2 pr-3"
            onClick={onDel}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2.5 pb-2 pt-2.5">
        {calcParams.map((item) => {
          return (
            <div
              key={item.code}
              className="calc-active shadow-3 rounded-lg text-sm flex items-center justify-center font-bold py-2.5"
              onClick={() => handleNumber(item.code)}
            >
              {item.name}
            </div>
          );
        })}
        <div
          className="calc-active shadow-3 rounded-lg text-sm flex items-center justify-center font-bold py-2.5"
          onClick={() => handleNumber("complete")}
        >
          {operationState ? "=" : "完成"}
        </div>
      </div>
    </Fragment>
  );
};

export default Calc;
