export const numHandle = (value: string): number =>
  parseFloat(Number(value).toFixed(10));

/* 检验字符串最后是否包含运算符 */
export const lastOperation = (value: string): boolean =>
  /(×|＋|－)$/.test(value);
/**
 * 判断运算公式对不对
 * @param {string} value 检查的值
 * @returns boolean
 */
export const correctOperation = (value: string): boolean => {
  /* 检验最后是否包含运算符 */
  if (lastOperation(value)) return false;
  // const isRational = /(×|＋|－)/.test(value);
  return /(×|＋|－)/.test(value);
};

/* 获取运算符 */
export const getOperation = (value: string): string =>
  value.match(/(×|＋|－)/g)[0];

/* 运算结果 */
export const operationResolve = (value: string): number | null => {
  const operator = getOperation(value);
  if (correctOperation(value)) {
    let calc = 0;
    if (operator) {
      const values = value.split(operator);
      switch (operator) {
        case "＋":
          calc = parseFloat(
            (Number(values[0]) + Number(values[1])).toFixed(10)
          );
          break;
        case "－":
          calc = parseFloat(
            (Number(values[0]) - Number(values[1])).toFixed(10)
          );
          break;
        case "×":
          calc = parseFloat(
            (Number(values[0]) * Number(values[1])).toFixed(10)
          );
      }
    }

    return calc;
  } else {
    console.error("请正确运算");
    return null;
  }
};

/* 检验数字是否符合格式 */
export const verifyNumber = (value: string): boolean =>
  /^([-]{0,}((0{0,1}\.{0,1})|([1-9]*[0]*[1-9]*\.))[0-9]*)$/.test(value);

/* 替换字符串最后运算符 */
export const operationReplace = (
  value: string,
  operation: "×" | "＋" | "－" | ""
): string => value.replace(/(×|＋|－){1}$/, operation);
