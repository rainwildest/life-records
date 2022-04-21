import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);
dayjs.extend(calendar);

/**
 * 相对时间
 * @param tiem 时间
 * @returns string
 */
export const relative = (tiem: string): string => dayjs().to(dayjs(tiem));

/**
 * 格式时间
 * @param time 时间
 * @param format 格式
 * @returns string
 */
export const format = (time: string | number | Date | dayjs.Dayjs, format = "YYYY-MM-DD"): string => dayjs(time).format(format);

/**
 * @description 转IOS 8601字符串
 * @param {string | number | Date | dayjs.Dayjs} time
 * @returns string
 */
export const toISOString = (time: string | number | Date | dayjs.Dayjs): string => dayjs(time).toISOString();

/**
 * @description 获取当前日期
 * @param format 输出的格式
 * @returns string
 */
export const getCurrentDate = (format = "YYYY-MM-DD"): string => dayjs().format(format);

/**
 * @description 获取当月天数
 * @param {string | number | Date | dayjs.Dayjs} date
 * @returns
 */
export const getDaysInMonth = (date?: string | number | Date | dayjs.Dayjs): number => {
  const $time = date ? date : getCurrentDate();

  return dayjs($time).daysInMonth();
};

export const getCalendar = (time: string | null = null): string => {
  return dayjs().calendar(time, {
    sameDay: dayjs(time).to(dayjs()), // The same day ( Today at 2:30 AM )
    nextDay: `昨天 ${format(time, "HH:mm")}`, // The next day ( Tomorrow at 2:30 AM )
    nextWeek: `${format(time, "YYYY-MM-DD HH:mm")}`, // The next week ( Sunday at 2:30 AM )
    lastDay: `明天 ${format(time, "HH:mm")}`, // The day before ( Yesterday at 2:30 AM )
    lastWeek: `${format(time, "YYYY-MM-DD HH:mm")}`, // Last week ( Last Monday at 2:30 AM )
    sameElse: `${format(time, "YYYY-MM-DD HH:mm")}` // Everything else ( 7/10/2011 )
  });
};

export default dayjs;
