import React, { useEffect, useState, useRef, memo } from "react";
import { f7, Sheet } from "framework7-react";

/**
 * @param {string} date 默认日期
 * @param {boolean} isCurrnetYear 只到当前年
 * @param {boolean} isCurrentMonth 只到当前月
 * @param {boolean} sheetOpened 打开或关闭日期选择器
 * @param {Function} onSheetClosed 关闭回调
 * @param {Function} onConfirm 确认回到
 */
type SheetProps = {
  date?: string;
  isCurrnetYear?: boolean;
  isCurrentMonth?: boolean;
  sheetOpened?: boolean;
  onSheetClosed?: () => void;
  onConfirm?: (value: string) => void;
};

const formatDate = (dates = []): string => {
  let value = "";
  if (dates.length === 2) {
    const number = Number(dates[1]) + 1;
    const month = number.toString().length > 1 ? number : `0${number}`;
    value = `${dates[0]}-${month}`;
  } else {
    value = dates.join("");
  }

  return value;
};

const getYearsColumn = (isCurrnet = false) => {
  const today = new Date();

  /* years */
  const years = [];
  const ColValuesYears = { values: years };
  const currentYear = today.getFullYear();

  const calc = currentYear - 1995;
  const loopCalc = isCurrnet ? currentYear + 1 - 1995 : calc + 5;

  for (let i = 0; i < loopCalc; ++i) years.push(1995 + i);

  return ColValuesYears;
};

const getMonthsColumn = (isCurrnet = false) => {
  const today = new Date();

  /* months */
  const months = [];
  const displayValuesMonths = [];
  const ColValuesMonths = {
    values: months,
    displayValues: displayValuesMonths
    // textAlign: "left"
  };

  const calc = today.getMonth();
  const loopCalc = isCurrnet ? calc + 1 : 12;

  for (let i = 0; i < loopCalc; ++i) {
    months.push(i);
    displayValuesMonths.push(i + 1 < 10 ? `0${i + 1}` : i + 1);
  }

  return ColValuesMonths;
};

const SheetModalPicker: React.FC<SheetProps> = ({
  date,
  isCurrnetYear = false,
  isCurrentMonth = false,
  sheetOpened = false,
  onSheetClosed,
  onConfirm
}) => {
  const picker = useRef(null);
  const yearMonth = useRef(null);
  const fullYear = useRef(null);
  const $date = useRef<string | null>(date || "");
  const hasConfirm = useRef(false);
  const insideClosed = useRef(false);
  const [dateType, setDateType] = useState("year-month");

  const onConfirmPicker = () => {
    const value = formatDate(picker.current.value);
    $date.current = value;
    hasConfirm.current = true;

    !!onConfirm && onConfirm(value);
    !!onSheetClosed && onSheetClosed();
  };

  useEffect(() => {
    if (!window || !sheetOpened) return;

    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    if ($date.current) {
      const split = $date.current.split("-");

      year = parseInt(split[0]);
      month = parseInt(split[1]) - 1;
    }

    picker.current = f7.picker.create({
      containerEl: yearMonth.current,
      toolbar: false,
      rotateEffect: true,
      value: [year, month],
      cols: [
        // Years
        { ...getYearsColumn(isCurrnetYear) },
        {
          divider: true,
          content: "&nbsp;&nbsp;"
        },
        // Months
        { ...getMonthsColumn(isCurrentMonth) }
      ]
    });

    // return () => {};
  }, [sheetOpened]);

  const onInsideSheetClosed = () => {
    console.log("dfff", !!onSheetClosed && !hasConfirm.current);
    !!onSheetClosed && !hasConfirm.current && onSheetClosed();

    insideClosed.current = true;
    hasConfirm.current = false;
  };

  const onTypeSwitch = () => {
    console.log("dfsdjkfl", dateType);
    setDateType(dateType === "year-month" ? "full-year" : "year-month");
    // picker.current.cols = [{ ...getYearsColumn(isCurrnetYear) }];
  };

  useEffect(() => {
    if (!window && dateType === "full-month") return;
    console.log("sdfsdfsdfsdfsdfsdfsdfs");
    const today = new Date();
    let year = today.getFullYear();

    if ($date.current) {
      const split = $date.current.split("-");

      year = parseInt(split[0]);
    }

    picker.current = f7.picker.create({
      containerEl: fullYear.current,
      toolbar: false,
      rotateEffect: true,
      value: [year],
      cols: [
        // Years
        { ...getYearsColumn(isCurrnetYear) }
      ]
    });
  }, [dateType]);

  return (
    <Sheet
      backdrop
      className="sheet-picker-date h-auto pb-5 rounded-t-xl"
      opened={sheetOpened}
      onSheetClosed={onInsideSheetClosed}
    >
      <div className="flex justify-between px-4 pb-5 pt-3">
        <div className="shadow-active-2 h-8 flex items-center text-sm px-6 rounded-lg text-blue-500" onClick={onConfirmPicker}>
          确 认
        </div>
        <div className="shadow-2 shadow-active-2 text-sm rounded-md flex items-center justify-center px-6" onClick={onTypeSwitch}>
          全年
        </div>
        <div
          className="shadow-active-2 h-8 flex items-center text-sm px-6 rounded-lg text-gray-700 dark:text-white"
          onClick={onSheetClosed}
        >
          取 消
        </div>
      </div>

      <div className={`${dateType === "year-month" ? "h-52" : ""}`}>
        {sheetOpened && dateType === "year-month" && <div className="h-full" ref={yearMonth} />}
      </div>
      <div className={`${dateType === "full-year" ? "h-52" : ""}`}>
        {sheetOpened && dateType === "full-year" && <div className="h-full" ref={fullYear} />}
      </div>
    </Sheet>
  );
};

export default memo(SheetModalPicker);
