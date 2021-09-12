import Framework7 from "framework7/lite-bundle";
import { f7 } from "framework7-react";

// @ts-ignore
const events = new Framework7.Events();

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

const openFullYears = () => {
  fullYearAndMonths.close();
  fullYears.open();
};
const openFullYearsAndMonths = () => {
  fullYears.close();
  fullYearAndMonths.open();
};

const onConfirm = function (picker) {
  return () => {
    const value = formatDatePicker(picker.value);
    events.emit("confirm", value);
    picker.close();
  };
};

const fullYears = f7.picker.create({
  toolbar: true,
  rotateEffect: true,
  renderToolbar: function () {
    return `
    <div class="toolbar">
      <div class="toolbar-inner">
        <div class="left confirm-full-year text-sm">
          <a href="#" class="link toolbar-randomize-link">确&nbsp;定</a>
        </div>
        <div class="open-full-years-months center w-24 text-sm">
          <a href="#" class="link rounded-lg" style="background-color: rgba(0, 0, 0, 0.12);height: 30px;">
            年&nbsp;月
          </a>
        </div>
        <div class="right text-sm">
          <a href="#" class="link sheet-close popover-close">关&nbsp;闭</a>
        </div>
      </div>
    </div>`;
  },
  value: [today.getFullYear()],
  cols: [
    ColValuesYears,
    {
      divider: true,
      content: "&nbsp;&nbsp;"
    }
  ],
  on: {
    open: function (picker) {
      f7.$(".confirm-full-year").on("click", onConfirm(picker));
      f7.$(".open-full-years-months").on("click", openFullYearsAndMonths);
    },
    close: function (picker) {
      f7.$(".confirm-full-year").off("click", onConfirm(picker));
      f7.$(".open-full-years-months").off("click", openFullYearsAndMonths);
    }
  }
});

const fullYearAndMonths = f7.picker.create({
  toolbar: true,
  rotateEffect: true,
  renderToolbar: function () {
    return `
    <div class="toolbar">
      <div class="toolbar-inner">
        <div class="left confirm-full-year-month text-sm">
          <a href="#" class="link toolbar-randomize-link">确&nbsp;定</a>
        </div>
        <div class="open-full-years center w-24 text-sm">
          <a href="#" class="link rounded-lg" style="background-color: rgba(0, 0, 0, 0.12);height: 30px;">
            全&nbsp;年
          </a>
        </div>
        <div class="right text-sm">
          <a href="#" class="link sheet-close popover-close">关&nbsp;闭</a>
        </div>
      </div>
    </div>`;
  },
  value: [today.getFullYear(), today.getMonth()],
  cols: [
    // Years
    ColValuesYears,
    {
      divider: true,
      content: "&nbsp;&nbsp;"
    },
    // Months
    ColValuesMonths
  ],
  on: {
    open: function (picker) {
      f7.$(".confirm-full-year-month").on("click", onConfirm(picker));
      f7.$(".open-full-years").on("click", openFullYears);
    },
    close: function (picker) {
      f7.$(".confirm-full-year-month").off("click", onConfirm(picker));
      f7.$(".open-full-years").off("click", openFullYears);
    }
  }
});

export const formatDatePicker = (dates: Array<string>): string => {
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

/**
 * @param {object | function} args
 * @param {function} confirm
 */
const date = (args?: any, confirm?: any) => {
  const { isFullYear = false } = args || {};

  const callback = (value) => {
    if (typeof args === "function") {
      args(value);
      return;
    }
    if (confirm) confirm(value);
  };
  events.off("confirm");
  events.on("confirm", callback);

  return isFullYear ? fullYears : fullYearAndMonths;
};

export default date;
