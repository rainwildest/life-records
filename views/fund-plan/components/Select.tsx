import React, { useEffect, useState } from "react";
import {
  Page,
  PageContent,
  Navbar,
  NavRight,
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  BlockTitle,
  useStore,
  f7
} from "framework7-react";
import { mergeClassName } from "lib/api/utils";

type SelectOptions = {
  cols: any[];
  values?: any[];
  className?: string;
  format?: (values?: any[], displayValues?: any[], index?: number) => string;
  onComfire?: (value: any) => void;
};

const Select: React.FC<SelectOptions> = ({
  values = [],
  cols,
  className = "",
  format
}) => {
  const [picker, setPicker] = useState(null);
  const [vals, setVals] = useState(values);
  const [display, setDisplay] = useState("");
  const defaultClassName =
    "shadow-active-2 text-xs inline-flex shadow-2 px-3 py-1 rounded-full items-center";

  const formatHandle = (values, cols) => {
    let _cols = [];
    let _displayValues = [];
    let _index = null;

    values.forEach((val, index) => {
      const col = cols[index].values;
      _cols = col;
      _displayValues = cols[index]?.displayValues || null;
      _index = col.indexOf(val);
    });

    return format(_cols, _displayValues, _index);
  };

  const callback = (picker) => {
    return () => {
      const _display = format
        ? formatHandle(picker.value, cols)
        : picker.value.join(" ");
      console.log(_display);
    };
  };

  const selectClass = `select-${Math.random().toString(16).substr(8, 6)}`;
  console.log(selectClass);
  useEffect(() => {
    const args = {
      value: vals,
      rotateEffect: true,
      renderToolbar: function () {
        return `
          <div class="toolbar">
            <div class="toolbar-inner">
                <div class="left ${selectClass}">
                  <a href="#" class="link toolbar-randomize-link w-12 text-sm text-center">确 定</a>
                </div>
                <div class="right">
                  <a href="#" class="link sheet-close popover-close w-12 text-sm text-center">关 闭</a>
                </div>
            </div>
          </div>
        `;
      },
      cols,
      on: {
        open: (picker) => {
          console.log(selectClass);
          f7.$(`.${selectClass}`).on("click", callback(picker));
        },
        closed: function (picker) {
          picker.setValue(vals);
          f7.$(`.${selectClass}`).off("click", callback);
        },
        change: (picker) => {
          console.log(picker.value);
        }
      }
    };

    const _picker = f7.picker.create(args);
    const values = _picker.getValue() as any[];
    const _display = format ? formatHandle(values, cols) : values.join(" ");

    setDisplay(_display);
    setPicker(_picker);
  }, []);

  return (
    <div
      className={mergeClassName(className, defaultClassName)}
      onClick={() => {
        picker.open();
      }}
    >
      {display}
      <div className="ml-2 w-0 h-0 triangle" />
    </div>
  );
};

export default Select;
