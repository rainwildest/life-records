import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

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
export const format = (time: string, format = "YYYY-MM-DD"): string =>
  dayjs(time).format(format);

export default dayjs;
