import React, { useEffect, useRef, memo } from "react";
import { f7, Sheet } from "framework7-react";

type SheetModalPickerProps = {
  cols: any[];
  values?: any;
  sheetOpened?: boolean;
  onSheetClosed?: () => void;
  onConfirm?: (value: string, indexs: Array<number>) => void;
};

const SheetModalPicker: React.FC<SheetModalPickerProps> = ({ cols, values, sheetOpened, onConfirm, onSheetClosed }) => {
  const picker = useRef(null);
  const $value = useRef(null);

  const onConfirmPicker = () => {
    // const value = formatDate(picker.current.value);
    $value.current = picker.current.value;
    console.log();
    const indexs = [];
    picker.current.cols.forEach((item) => {
      indexs.push(item.activeIndex);
    });
    !!onConfirm && onConfirm(picker.current.value, indexs);
    !!onSheetClosed && onSheetClosed();
  };

  useEffect(() => {
    if (!window || !sheetOpened) return;

    picker.current = f7.picker.create({
      containerEl: picker.current,
      toolbar: false,
      rotateEffect: true,
      value: $value.current || values,
      cols
    });

    // return () => {
    //   !!onSheetClosed && onSheetClosed();
    // };
  }, [sheetOpened]);

  return (
    <Sheet
      backdrop
      className="sheet-picker-date h-auto pb-5 rounded-t-xl overflow-hidden"
      opened={sheetOpened}
      onSheetClosed={onSheetClosed}
    >
      <div className="flex justify-between px-4 pb-3 pt-3 mb-5">
        <div
          className="shadow-bg-white-3 shadow-bg-white-active-3 h-8 flex items-center text-sm px-6 rounded-lg text-blue-500"
          onClick={onConfirmPicker}
        >
          确 认
        </div>
        <div
          className="shadow-bg-white-3 shadow-bg-white-active-3 h-8 flex items-center text-sm px-6 rounded-lg text-gray-700 dark:text-white"
          onClick={onSheetClosed}
        >
          取 消
        </div>
      </div>

      {sheetOpened && <div ref={picker} />}
    </Sheet>
  );
};

export default memo(SheetModalPicker);
