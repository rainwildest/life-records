import React from "react";
import Icons from "components/Icons";
import { mergeClassName } from "lib/api/utils";

type AmountsOptions = {
  income: string;
  pay: string;
  className?: string;
  incomTitle?: string;
  payTitle?: string;
};
const Amounts: React.FC<AmountsOptions> = ({
  income,
  pay,
  incomTitle = "收入",
  payTitle = "支出",
  className = ""
}) => {
  const defaultClassName =
    "amounts-icon-1 shadow-3 p-4 rounded-lg text-xs text-gray-700 text-right font-bold flex justify-between items-center";

  return (
    <div className={mergeClassName(className, defaultClassName)}>
      <Icons name="amounts" />
      <div>
        <span>
          {incomTitle}：{income}
        </span>
        <span className="pl-4">
          {payTitle}：{pay}
        </span>
      </div>
    </div>
  );
};

export default Amounts;
