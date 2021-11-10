import React from "react";
import Icons from "components/Icons";

type CostCardOptions = {
  useMarginTop14: boolean;
  type: string;
  time?: string;
  typeName: string;
  amounts?: number | string;
  remarks?: string;
  incomeTitle: string;
  payTitle: string;
};

const CostCard: React.FC<CostCardOptions> = ({
  useMarginTop14 = false,
  type,
  time,
  typeName,
  amounts,
  remarks
}) => {
  const color = type === "pay" ? "text-green-500" : "text-red-700";

  return (
    <div
      className={`${
        useMarginTop14 ? "mt-14 " : "mt-8 "
      }shadow-3 rounded-lg py-3 px-4 relative overflow-hidden w-full flex items-center`}
    >
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
