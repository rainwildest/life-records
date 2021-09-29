import { f7 } from "framework7-react";

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

export const formatDatePicker = (dates = []): string => {
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

const renderFullYearToolbar = function () {
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
};

const renderYearAndMonthsToolbar = (hasFullYear = true) => {
  return function () {
    return `
    <div class="toolbar">
      <div class="toolbar-inner">
        <div class="left confirm-full-year-month text-sm">
          <a href="#" class="link toolbar-randomize-link">确&nbsp;定</a>
        </div>
        ${
          hasFullYear
            ? `
            <div class="open-full-years center w-24 text-sm">
              <a href="#" class="link rounded-lg" style="background-color: rgba(0, 0, 0, 0.12);height: 30px;">
                全&nbsp;年
              </a>
            </div>
            `
            : ""
        }
        <div class="right text-sm">
          <a href="#" class="link sheet-close popover-close">关&nbsp;闭</a>
        </div>
      </div>
    </div>`;
  };
};

/**
 * @param {object} args
 * @param {function} confirm
 */
type ConfirmFunction = (value: string) => void;
type DateOptions = {
  isFullYear?: boolean;
  hasFullYear?: boolean;
};
const date = (args?: DateOptions, confirm?: ConfirmFunction): any => {
  const { isFullYear = false, hasFullYear = true } = args || {};
  let originalFullYear = null;
  let originalYearAndMonths = null;

  const callback = (picker) => {
    return () => {
      const value = formatDatePicker(picker.value);
      if (value.length <= 4) {
        originalFullYear = picker.value;
      } else {
        originalYearAndMonths = picker.value;
      }

      picker.close();
      if (confirm) confirm(value);
    };
  };

  const yearAndMonths = f7?.picker.create({
    toolbar: true,
    rotateEffect: true,
    renderToolbar: renderYearAndMonthsToolbar(hasFullYear),
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
    ],
    on: {
      open: function (picker) {
        f7.$(".confirm-full-year-month").on("click", callback(picker));
        f7.$(".open-full-years").on("click", openFullYears);
      },
      close: function (picker) {
        f7.$(".confirm-full-year-month").off("click", callback(picker));
        f7.$(".open-full-years").off("click", openFullYears);
      },
      closed: function (picker) {
        picker.setValue(originalYearAndMonths);
      }
    }
  });
  if (yearAndMonths) originalYearAndMonths = yearAndMonths.value;
  if (!hasFullYear) return yearAndMonths;

  const fullYears = f7?.picker.create({
    toolbar: true,
    rotateEffect: true,
    renderToolbar: renderFullYearToolbar,
    value: [today.getFullYear()],
    cols: [{ ...ColValuesYears }],
    on: {
      open: function (picker) {
        f7.$(".confirm-full-year").on("click", callback(picker));
        f7.$(".open-full-years-months").on("click", openFullYearsAndMonths);
      },
      close: function (picker) {
        f7.$(".confirm-full-year").off("click", callback(picker));
        f7.$(".open-full-years-months").off("click", openFullYearsAndMonths);
      },
      closed: function (picker) {
        picker.setValue(originalFullYear);
      }
    }
  });

  if (fullYears) originalFullYear = fullYears.value;

  const openFullYears = () => {
    yearAndMonths.close();
    fullYears.open();
  };

  const openFullYearsAndMonths = () => {
    fullYears.close();
    yearAndMonths.open();
  };

  return isFullYear ? fullYears : yearAndMonths;
};

export default date;
