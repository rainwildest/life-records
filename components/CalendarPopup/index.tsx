import React, { useEffect, useRef, useState } from "react";
import { Button, Popup, f7 } from "framework7-react";
import { parseInt } from "lodash";

type CalendarPopupOption = {
  value?: Date | string;
  popupOpened: boolean;
  onCancel?: () => void;
  onConfirm?: (date?: string) => void;
};

const format = (date: Date, fmt = "yyyy-MM-dd"): string => {
  // author: meizz
  const time = new Date(date);
  const o = {
    "M+": time.getMonth() + 1, // 月份
    "d+": time.getDate(), // 日
    "h+": time.getHours(), // 小时
    "m+": time.getMinutes(), // 分
    "s+": time.getSeconds(), // 秒
    "q+": Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (time.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

const CalendarPopup: React.FC<CalendarPopupOption> = ({
  value,
  popupOpened,
  onCancel,
  onConfirm
}) => {
  let defaultValue = null;
  let formatValue = "";

  if (value) {
    defaultValue = typeof value === "string" ? new Date(value) : value || null;
  }

  if (defaultValue) {
    formatValue =
      typeof defaultValue !== "string"
        ? format(value as Date)
        : (value as string) || "";
  }

  const [dateSelect, setDateSelect] = useState(formatValue);
  const [customCalendar] = useState(
    `custom-calendar-${parseInt((Math.random() * 100).toString())}`
  );
  const containerEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Inline with custom toolbar
    const calendarInline = f7.calendar.create({
      containerEl: containerEl.current,
      value: [typeof value === "string" ? new Date(value) : value || null],
      weekHeader: true,
      cssClass: `${customCalendar} custom-calendar-fontsize`,
      timePicker: false,
      dateFormat: "yyyy-MM-DD",
      renderToolbar: function () {
        return `
          <div class="toolbar calendar-custom-toolbar no-shadow">
            <div class="toolbar-inner">
              <div class="calendar-month-selector custom-month-selector">
                <a href="#" class="link icon-only left calendar-prev-month-button">
                  <i class="icon icon-prev"></i>
                </a>
                <a class="center w-full text-center"></a>
                <a href="#" class="link icon-only right calendar-next-month-button">
                  <i class="icon icon-next"></i>
                </a>
              </div>
              <div class="calendar-year-selector custom-year-selector">
                <a href="#" class="link icon-only left calendar-prev-year-button">
                  <i class="icon icon-prev"></i>
                </a>
                <a class="center w-full text-center"></a>
                <a href="#" class="link icon-only right calendar-next-year-button">
                  <i class="icon icon-next"></i>
                </a>
              </div>
            </div>
          </div>
          `;
      },
      on: {
        init: function (c) {
          const months = [];
          const years = [];
          for (let i = 0; i < 12; ++i) months.push(i);
          for (let i = 0; i < c.currentYear - 1995 + 5; ++i)
            years.push(1995 + i);

          const currentMonth = c.currentMonth + 1;
          f7.$(".custom-month-selector .center").text(
            `${currentMonth < 10 ? `0${currentMonth}` : currentMonth}`
          );
          f7.$(".custom-year-selector .center").text(`${c.currentYear}`);

          f7.$(".custom-month-selector .center").click(() => {
            f7.$(`.${customCalendar}`).append(
              `
                <div class="calendar-month-picker grid grid-cols-4">
                  ${months
                    .map((item) => {
                      return `
                      <div class="month-item flex justify-center items-center" data-month=${item}>
                        ${item + 1 < 10 ? `0${item + 1}` : item + 1}月
                      </div>`;
                    })
                    .join("")}
                </div>
              `
            );

            f7.$(".month-item").click((e) => {
              calendarInline.setYearMonth(
                c.currentYear,
                f7.$(e.target).data("month"),
                300
              );
              f7.$(".calendar-month-picker").remove();
            });
          });
          f7.$(".custom-year-selector .center").click(() => {
            f7.$(`.${customCalendar}`).append(
              `
                <div class="calendar-year-picker block m-0">
                ${years
                  .map((item) => {
                    return `
                      <div class="year-item text-center py-2 my-2 bg-gray-200 rounded-lg" data-year=${item}>
                        ${item}年
                      </div>
                    `;
                  })
                  .join("")}
                </div>
              `
            );
            f7.$(".year-item").click((e) => {
              calendarInline.setYearMonth(
                f7.$(e.target).data("year"),
                c.currentMonth,
                300
              );
              f7.$(".calendar-year-picker").remove();
            });
          });
        },
        monthYearChangeStart: function (c) {
          const currentMonth = c.currentMonth + 1;
          f7.$(".custom-month-selector .center").text(
            `${currentMonth < 10 ? `0${currentMonth}` : currentMonth}`
          );
          f7.$(".custom-year-selector .center").text(`${c.currentYear}`);
        },
        dayClick: function (calendar, dayEl, year, month, day) {
          month = month + 1;
          setDateSelect(
            `${year}-${month < 10 ? `0${month}` : month}-${
              day < 10 ? `0${day}` : day
            }`
          );
        }
      }
    });

    return () => calendarInline.destroy();
  }, []);

  const _onConfirm = () => {
    if (onConfirm) onConfirm(dateSelect);
  };

  return (
    <Popup
      className="calendar-popup "
      style={{
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "saturate(180%) blur(var(--f7-bars-translucent-blur))"
      }}
      opened={popupOpened}
      onPopupClosed={() => {
        if (value !== dateSelect) setDateSelect(value as string);
      }}
    >
      <div
        className="absolute w-full h-full flex flex-col justify-center items-center"
        onClick={onCancel ? onCancel : null}
      />
      <div className="absolute w-full flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="block-title bg-gray-200 p-3 rounded-xl text-2xl text-gray-800 m-0 mb-3"
          style={{ width: "95%", maxWidth: "400px" }}
        >
          {dateSelect || "请选择日期"}
        </div>
        <div
          className="block block-strong no-padding overflow-hidden rounded-xl m-0"
          style={{ width: "95%", maxWidth: "400px" }}
        >
          <div className="mb-2" ref={containerEl}></div>

          <div className="flex justify-end p-4">
            <Button
              className="w-24"
              color="blue"
              onClick={onCancel ? onCancel : null}
            >
              取&ensp;消
            </Button>
            <Button className="w-24" color="blue" onClick={_onConfirm}>
              确&ensp;定
            </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default CalendarPopup;
