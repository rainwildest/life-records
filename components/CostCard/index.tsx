import React from "react";
import Icons from "components/Icons";
import { mergeClassName } from "lib/api/utils";
type CostCardOptions = {
  type: string;
  time?: string;
  typeName: string;
  amounts?: number | string;
  remarks?: string;
  className?: string;
};

const CostCard: React.FC<CostCardOptions> = ({
  type,
  time,
  typeName,
  amounts,
  remarks,
  className = ""
}) => {
  const color = type === "pay" ? "text-green-500" : "text-red-700";
  const defaultClassName =
    "shadow-3 rounded-lg py-3 px-4 relative overflow-hidden w-full flex items-center";

  return (
    <div className={mergeClassName(className, defaultClassName)}>
      <Icons name="moon" className="budget-icon pr-3" />
      <div className="cost-item-container">
        <div className="flex justify-between">
          <div className="text-gray-500 text-xs">{typeName}</div>
          <div className="text-gray-500 text-xs font-medium">{time}</div>
        </div>
        <div className="flex justify-between">
          <div
            className={`${
              remarks ? "text-gray-600" : "text-gray-300"
            }  mt-2 text-sm truncate`}
          >
            {remarks ? remarks : "暂无备注"}
          </div>
          <div className={`${color} mt-2 text-sm font-bold  flex-shrink-0`}>
            {type === "pay" ? "-" : "+"}￥{amounts}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCard;
