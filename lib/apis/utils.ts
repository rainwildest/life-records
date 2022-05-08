import { snakeCase } from "lodash";
import { f7 } from "framework7-react";
import { format } from "./dayjs";

/* 数据类型判断 */
export const typeOf = (value: any): string => {
  /* 使用原型链来实现这一方法 */
  let res = Object.prototype.toString.call(value);

  /* 字符串分割 */
  res = res.split(" ")[1];

  /* 字符串切割 */
  res = res.substring(0, res.length - 1);

  return res.toLowerCase();
};

export const isJSON = (str: string): boolean => {
  if (typeof str === "string") {
    try {
      const obj = JSON.parse(str);
      return typeof obj === "object" && obj ? true : false;
    } catch (e) {
      return false;
    }
  }

  return typeOf(str) === "object";
  // throw "parameter should be a string";
};

export const tanslateSnake = <T>(feilds: { [P in keyof T]?: any }): any => {
  const value: any = {};
  Object.keys(feilds).forEach((key) => {
    value[snakeCase(key)] = feilds[key];
  });

  return value;
};

/**
 * 合并 className
 * @param {string} defaultClassName
 * @param {string} className
 * @returns string
 */
export const mergeClassName = (className: string, defaultClassName = ""): string => {
  const classNameSplit = className.split(" ");
  const defaultClassNameSplit = defaultClassName.split(" ");

  /* 去重 */
  const classNameArray = new Set([...defaultClassNameSplit, ...classNameSplit]);

  return [...classNameArray].join(" ").replace(/^\s+|\s+$/g, "");
};

/**
 * 百分比
 * @param {number} values 值列表
 * @param {number} index 索引
 * @param {number} precision 保留小数，默认为1
 */
export const percentage = (values: number[], index: number, precision = 1): number => {
  // 判断是否为空
  if (!values[index]) return 0;

  // 求和
  const sum = values.reduce(function (acc, val) {
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  if (sum === 0) return 0;

  // 10的2次幂是100，用于计算精度。
  const digits = Math.pow(10, precision);

  // 扩大比例100，
  const votesPerQuota = values.map(function (val) {
    return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
  });

  // 总数，扩大比例意味的总数要扩大
  const targetSeats = digits * 100;

  // 再向下取值，组成数组
  const seats = votesPerQuota.map(function (votes) {
    return Math.floor(votes);
  });

  // 再新计算合计，用于判断与总数量是否相同，相同则占比会100%
  let currentSum = seats.reduce(function (acc, val) {
    return acc + val;
  }, 0);

  // 余数部分的数组：原先数组减去向下取值的数组，得到余数部分的数组
  const remainder = votesPerQuota.map(function (votes, idx) {
    return votes - seats[idx];
  });

  // 给最大最大的余额加1，凑个占比100%；

  while (currentSum < targetSeats) {
    //  找到下一个最大的余额，给其加1
    let max = Number.NEGATIVE_INFINITY;
    let maxId = null;
    for (let i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i];
        maxId = i;
      }
    }

    // 对最大项余额加1
    ++seats[maxId];
    // 已经增加最大余数加1，则下次判断就可以不需要再判断这个余额数。
    remainder[maxId] = 0;
    // 总的也要加1，为了判断是否总数是否相同，跳出循环。
    ++currentSum;
  }

  // 这时候的seats就会总数占比会100%
  return seats[index] / digits;
};

/**
 * 数值添加逗号
 * @method thousands
 * @param {number | string} value 数值
 * @returns string
 */
export const thousands = (value: number | string): string => {
  if (!value) return "0";
  const res = [];
  const strValue = typeof value === "string" ? value : value.toString();
  const splits = strValue.split(".");
  const reverse = splits[0].split("").reverse();

  reverse.forEach((item, i) => {
    if (i % 3 === 0 && i !== 0) res.push(",");
    res.push(item);
  });
  return `${res.reverse().join("")}${splits.length > 1 ? `.${splits[1]}` : ""}`;
};

export const toastTip = (text = ""): void => {
  f7.toast
    .create({
      text,
      position: "center",
      closeTimeout: 2000
    })
    .open();
};

/**
 * 判断是否为当天日期
 * @method isSameDay
 * @param {string} date 日期
 * @returns boolean
 */
export const isSameDay = (date: string): boolean => {
  const _current = new Date().toISOString();
  const current = format(_current);
  const _date = format(date);

  return current === _date;
};

export const timeStamp = (date?: string): number => {
  const time = date ? new Date(date) : new Date();

  time.setHours(0);
  time.setMinutes(0);
  time.setSeconds(0);
  time.setMilliseconds(0);
  return time.getTime();
};

/**
 * @description 自动切割填充日期的 format 格式（暂时只支持日期）
 * @param {string} date
 * @returns String
 */
export const autoFormatDate = (date: string): string => {
  const $format = [];
  const values = date.split(" ");
  const dateSplit = values[0].split("-");

  dateSplit.forEach((item) => {
    const len = item.length;

    if (len === 4) $format.push("Y".repeat(4));

    if ((len === 1 || len === 2) && !$format.includes("MM")) {
      $format.push("M".repeat(2));
    } else if ((len === 1 || len === 2) && !$format.includes("DD")) {
      $format.push("D".repeat(2));
    }
  });

  return $format.join("-");
};
