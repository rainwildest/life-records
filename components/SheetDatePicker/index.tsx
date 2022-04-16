import React, { useEffect, useRef } from "react";
import { f7, Sheet } from "framework7-react";

/**
 * @param {string} date 默认日期
 * @param {boolean} isCurrnetYear 只到当前年
 * @param {boolean} isCurrentMonth 只到当前月
 * @param {boolean} sheetOpened 打开或关闭日期选择器
 * @param {Function} onCloseSheet 关闭回调
 * @param {Function} onConfirm 确认回到
 */
type SheetProps = {
  date?: string;
  isCurrnetYear?: boolean;
  isCurrentMonth?: boolean;
  sheetOpened?: boolean;
  onCloseSheet?: () => void;
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
  onCloseSheet,
  onConfirm
}) => {
  const picker = useRef(null);
  const $date = useRef<string | null>(date || "");

  const onConfirmPicker = () => {
    const value = formatDate(picker.current.value);
    $date.current = value;

    !!onConfirm && onConfirm(value);
    !!onCloseSheet && onCloseSheet();
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
      containerEl: picker.current,
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

    return () => {
      !!onCloseSheet && onCloseSheet();
    };
  }, [sheetOpened]);

  return (
    <Sheet
      backdrop
      className="sheet-picker-date h-auto pb-5 rounded-t-xl overflow-hidden"
      opened={sheetOpened}
      onSheetClosed={onCloseSheet}
    >
      <div className="flex justify-between px-4 pb-3 pt-3 border-b border-solid border-gray-50 dark:border-zinc-700 mb-5">
        <div
          className="shadow-bg-white-3 shadow-bg-white-active-3 h-8 flex items-center text-sm px-5 rounded-lg text-blue-400"
          onClick={onConfirmPicker}
        >
          确 认
        </div>
        <div
          className="shadow-bg-white-3 shadow-bg-white-active-3 h-8 flex items-center text-sm px-5 rounded-lg text-gray-700 dark:text-white"
          onClick={onCloseSheet}
        >
          取 消
        </div>
      </div>

      {sheetOpened && <div ref={picker} />}
    </Sheet>
  );
};

export default SheetModalPicker;
