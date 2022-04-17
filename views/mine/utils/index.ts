import { thousands } from "lib/apis/utils";
import _ from "lodash";

export const statisticsHandle = (data, contrast): any => {
  const _statistics = [];
  _.keys(data).forEach((key) => {
    if (key === "__typename") return;
    const color = key === "pay" ? "text-green-500" : "text-red-700";
    const title = key === "pay" ? "支出统计" : "收入统计";
    const fields = { color, title };
    const _details = data[key];

    _.keys(_details).forEach((dateKey) => {
      if (dateKey === "__typename") return;
      const type = key === "pay" ? "支出" : "收入";
      fields[dateKey] = {
        total: thousands(_details[dateKey]),
        title: `${contrast[dateKey]}${type}`
      };
    });

    _statistics.push({ ...fields });
  });

  return _statistics;
};
