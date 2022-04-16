import React, { useEffect, useRef } from "react";
import { f7, Sheet } from "framework7-react";

type SheetProps = {
  sheetOpened?: boolean;
  onCloseSheet?: () => void;
  onConfirm?: (value: string) => void;
};

const today = new Date();

/* years */
const years = [];
const ColValuesYears = { values: years };
const currentYear = today.getFullYear();
for (let i = 0; i < currentYear - 1995 + 5; ++i) years.push(1995 + i);

/* months */
const months = [];
const displayValuesMonths = [];
const ColValuesMonths = {
  values: months,
  displayValues: displayValuesMonths
  // textAlign: "left"
};

for (let i = 0; i < 12; ++i) {
  months.push(i);
  displayValuesMonths.push(i + 1 < 10 ? `0${i + 1}` : i + 1);
}

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

const SheetModalPicker: React.FC<SheetProps> = ({ sheetOpened = false, onCloseSheet, onConfirm }) => {
  const picker = useRef(null);

  const onConfirmPicker = () => {
    const value = formatDate(picker.current.value);

    !!onConfirm && onConfirm(value);
    !!onCloseSheet && onCloseSheet();
  };

  useEffect(() => {
    if (!window || !sheetOpened) return;

    picker.current = f7.picker.create({
      containerEl: picker.current,
      toolbar: false,
      rotateEffect: true,
      value: [today.getFullYear(), today.getMonth()],
      cols: [
        // Years
        { ...ColValuesYears },
        {
          divider: true,
          content: "&nbsp;&nbsp;"
        },
        // Months
        { ...ColValuesMonths }
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
