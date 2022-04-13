import React from "react";
import Icons from "components/Icons";
import { mergeClassName } from "lib/api/utils";

type AmountsOptions = {
  income?: string;
  pay?: string;
  className?: string;
  incomTitle?: string;
  payTitle?: string;
};
const Amounts: React.FC<AmountsOptions> = ({ income, pay, incomTitle = "收入", payTitle = "支出", className = "" }) => {
  const defaultClassName = "shadow-3 p-4 rounded-lg text-xs text-gray-700 text-right font-bold flex justify-between items-center";

  return (
    <div className={mergeClassName(className, defaultClassName)}>
      <Icons name="amounts" className="amounts-icon svg-icon-30" />
      <div className="amounts-container flex justify-end">
        <div className="max-w-1/2 truncate">{income && `${incomTitle}：￥${income}`}</div>
        <div className="pl-3 max-w-1/2 truncate">{pay && `${payTitle}：￥${pay}`}</div>
      </div>
    </div>
  );
};

export default Amounts;
