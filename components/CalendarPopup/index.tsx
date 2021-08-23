import React, { useEffect, useRef, useState } from "react";
import { Button, Popup, f7ready, f7 } from "framework7-react";

type CalendarPopupOption = {
  popupOpened: boolean;
  setPopupOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const formatDate = (date: Date, fmt = "yyyy-MM-dd"): string => {
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
  popupOpened,
  onCancel,
  onConfirm
}) => {
  const [time, setTime] = useState(formatDate(new Date()));

  useEffect(() => {
    // Inline with custom toolbar
    const calendarInline = f7.calendar.create({
      containerEl: "#demo-calendar-inline-container",
      value: [new Date()],
      weekHeader: true,
      cssClass: "test-calendar",
      timePicker: false,
      dateFormat: "yyyy-MM-DD",
      renderToolbar: function () {
        return `
          <div class="toolbar calendar-custom-toolbar no-shadow">
            <div class="toolbar-inner">
              <div class="calendar-month-selector month-select">
                <a href="#" class="link icon-only left calendar-prev-month-button">
                  <i class="icon icon-prev"></i>
                </a>
                <a class="center w-full text-center"></a>
                <a href="#" class="link icon-only right calendar-next-month-button">
                  <i class="icon icon-next"></i>
                </a>
              </div>
              <div class="calendar-year-selector year-select">
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
          f7.$(".month-select .center").text(
            `${currentMonth < 10 ? `0${currentMonth}` : currentMonth}`
          );
          f7.$(".year-select .center").text(`${c.currentYear}`);

          f7.$(".month-select .center").click(() => {
            f7.$(".test-calendar").append(
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
          f7.$(".year-select .center").click(() => {
            f7.$(".test-calendar").append(
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
          f7.$(".month-select .center").text(
            `${currentMonth < 10 ? `0${currentMonth}` : currentMonth}`
          );
          f7.$(".year-select .center").text(`${c.currentYear}`);
        },
        change: function (calendar, value) {
          setTime(formatDate(value as Date));
        },
        closed: function () {
          console.log("sdklfjs");
        }
      }
    });

    return () => calendarInline.destroy();
  }, []);

  return (
    <Popup
      className="calendar-popup "
      style={{ background: "rgba(0,0,0,0.4)" }}
      opened={popupOpened}
      // swipeToClose={true}
      // onPopupClosed={onCancel ? onCancel : null}
    >
      <div className="absolute w-full h-full flex flex-col justify-center items-center">
        <div
          className="block-title bg-gray-200 p-3 rounded-xl text-2xl text-gray-800"
          style={{ width: "95%", maxWidth: "400px" }}
        >
          {time}
        </div>
        <div
          className="block block-strong no-padding overflow-hidden rounded-xl"
          style={{ width: "95%", maxWidth: "400px" }}
        >
          <div className="my-2" id="demo-calendar-inline-container"></div>

          <div className="flex justify-end p-4">
            <Button
              className="w-24"
              color="blue"
              onClick={onCancel ? onCancel : null}
            >
              取&ensp;消
            </Button>
            <Button
              className="w-24"
              color="blue"
              onClick={onConfirm ? onConfirm : null}
            >
              确&ensp;定
            </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default CalendarPopup;
