import React, { useEffect, useRef, useState } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Swiper,
  SwiperSlide,
  f7ready,
  f7,
  Popup
} from "framework7-react";
import Icons from "components/Icons";
import CalendarPopup from "components/CalendarPopup";
import { format } from "lib/api/utils";

const Bookkeeping: React.FC = () => {
  /* 显示的信息 */
  const [display, setDisplay] = useState("0");
  // const [calc, setCalc] = useState(0);
  /* 运算状态 */
  const [operationState, setOperationState] = useState(false);
  const [nextShowPoint, setNextShowPoint] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);
  const [date, setDate] = useState(format(new Date()));

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

  const type = [
    { name: "餐饮", code: "", icon: "i" },
    { name: "旅行", code: "", icon: "i" },
    { name: "服饰", code: "", icon: "i" },
    { name: "日用", code: "", icon: "i" },
    { name: "果蔬", code: "", icon: "i" },
    { name: "数码", code: "", icon: "i" },
    { name: "零食", code: "", icon: "i" },
    { name: "交通", code: "", icon: "i" },
    { name: "住房", code: "", icon: "i" },
    { name: "通讯", code: "", icon: "i" }
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

  return (
    <Page noToolbar>
      <Navbar>
        <NavLeft backLink></NavLeft>
        <NavTitle>账 房</NavTitle>
        {/* <NavRight>
          <Link>Right Link</Link>
        </NavRight> */}
      </Navbar>

      <Swiper
        className="demo-swiper demo-swiper-auto mt-4"
        spaceBetween={10}
        slidesPerView={"auto"}
        centeredSlides
      >
        <SwiperSlide>
          <div className="grid grid-cols-4 gap-4">
            <wired-card
              elevation="2"
              class="text-center font-bold py-4"
              onClick={() => {
                console.log("skdjf");
              }}
            >
              11
            </wired-card>

            <wired-card elevation="2" class="text-center font-bold py-4">
              12
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              13
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              14
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              15
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              16
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              17
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              18
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              19
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              20
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              21
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              22
            </wired-card>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-cols-4 gap-4">
            <wired-card elevation="2" class="text-center font-bold py-4">
              23
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              24
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              25
            </wired-card>
          </div>
        </SwiperSlide>
      </Swiper>

      <div
        className="w-full fixed bottom-0 pt-2 px-2"
        style={{
          backgroundImage: "linear-gradient(120deg, #2193b0 , #6dd5ed)"
        }}
      >
        {/* <div
          className="truncate py-1 px-2 rounded-lg mb-1"
          style={{ background: "white", border: "1px solid" }}
        > */}
        <wired-card
          fill="white"
          class="w-full py-1 px-3"
          onClick={() => {
            f7ready((f7) => {
              f7.dialog.prompt(
                "",
                "备注",
                () => {
                  console.log("OK");
                },
                () => {
                  console.log("cancel");
                }
              );
            });
          }}
        >
          <div className="truncate">
            <span className="pr-3">备注</span>
            <span></span>
          </div>
        </wired-card>
        {/* </div> */}
        {/* <div className="rounded-lg box-border overflow-hidden"> */}
        <wired-card fill="white" class="w-full mt-2 py-2">
          <div className="flex justify-between items-center">
            <div
              className="flex-shrink-0 pr-4 flex items-center"
              onClick={() => {
                setPopupOpened(true);
              }}
            >
              <div className="pr-1 pt-1">
                <Icons name="calendar" className="calc-calendar" />
              </div>
              <div className="text-xs">{date}</div>
            </div>
            <div className="truncate font-bold">{display}</div>
          </div>
        </wired-card>
        {/* </div> */}
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
      </div>

      <CalendarPopup
        popupOpened={popupOpened}
        value={date}
        onCancel={() => {
          setPopupOpened(false);
        }}
        onConfirm={(date) => {
          setDate(date);
          setPopupOpened(false);
        }}
      />
    </Page>
  );
};

export default Bookkeeping;
