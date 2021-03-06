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
  const hasConfirm = useRef(false);
  const insideClosed = useRef(false);

  const onConfirmPicker = () => {
    $value.current = picker.current.value;
    hasConfirm.current = true;

    const indexs = [];
    picker.current.cols.forEach((item) => {
      indexs.push(item.activeIndex);
    });

    !!onConfirm && onConfirm(picker.current.value, indexs);
    !!onSheetClosed && onSheetClosed();
  };

  const onInsideSheetClosed = () => {
    const hasClose = !!onSheetClosed && !hasConfirm.current && !insideClosed.current;

    hasClose && onSheetClosed();

    insideClosed.current = false;
    hasConfirm.current = false;
  };

  const onCancelClosed = () => {
    insideClosed.current = true;

    onSheetClosed && onSheetClosed();
  };

  const onExistenceValues = () => {
    const $values = [];

    $value.current?.forEach((element, index) => {
      const col = cols[index].values;
      const val = col.find((item) => item === $value.current[index]);

      $values.push(val ? val : col[index]);
    });

    $value.current = !$values.length ? null : $values;
  };

  useEffect(() => {
    if (!window || !sheetOpened) return;
    onExistenceValues();

    picker.current = f7.picker.create({
      containerEl: picker.current,
      toolbar: false,
      rotateEffect: true,
      value: $value.current || values,
      cols
    });
  }, [sheetOpened]);

  return (
    <Sheet
      backdrop
      className="sheet-picker-date h-auto pb-5 rounded-t-xl overflow-hidden"
      opened={sheetOpened}
      onSheetClosed={onInsideSheetClosed}
    >
      <div className="flex justify-between px-4 pb-3 pt-3 mb-5">
        <div className="shadow-active-2 h-8 flex items-center text-sm px-6 rounded-lg text-blue-500" onClick={onConfirmPicker}>
          ??? ???
        </div>
        <div
          className="shadow-active-2 h-8 flex items-center text-sm px-6 rounded-lg text-gray-700 dark:text-white"
          onClick={onCancelClosed}
        >
          ??? ???
        </div>
      </div>

      {sheetOpened && <div ref={picker} />}
    </Sheet>
  );
};

export default memo(SheetModalPicker);
