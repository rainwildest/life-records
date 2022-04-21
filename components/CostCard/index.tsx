import React from "react";
import Icons from "components/Icons";
import { mergeClassName } from "lib/apis/utils";

type CostCardOptions = {
  icon?: string;
  type: string;
  time?: string;
  book?: string;
  typeName: string;
  amounts?: number | string;
  remarks?: string;
  className?: string;
};

const CostCard: React.FC<CostCardOptions> = ({ icon, type, time, book, typeName, amounts, remarks, className = "" }) => {
  const color = type === "pay" ? "text-green-500" : "text-red-700";
  const defaultClassName = "shadow-3 rounded-lg py-3 px-4 relative overflow-hidden w-full";

  return (
    <div className={mergeClassName(className, defaultClassName)}>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icons name={icon || "default-01"} className={`svg-icon-25 pr-1 ${!icon ? "default-icon-color" : ""}`} />
            <p className="text-sm">{typeName}</p>
          </div>

          <p className="text-xs text-gray-500">{time}</p>
        </div>

        <div>
          <div className="text-center pt-3 text-gray-700 text-xs">{type === "pay" ? "支出费用" : "收入金额"}</div>
          <div className={`${color} mt-1 text-2xl text-center font-bold flex-shrink-0`}>
            {type === "pay" ? "-" : "+"}
            <span className="text-lg">￥</span>
            <span>{amounts}</span>
          </div>
        </div>

        <div className="pt-4">
          {book && (
            <div className="flex pb-2">
              <div className="text-sm text-gray-700 font-semibold pr-3 flex-shrink-0">账簿</div>
              <div className="text-sm text-gray-600">{book}</div>
            </div>
          )}
          <div className="flex">
            <div className="text-sm text-gray-700 font-semibold pr-3 flex-shrink-0">备注</div>
            <div className={`${remarks ? "text-gray-600" : "text-gray-300"} text-sm break-all`}>
              {remarks ? remarks : "暂无备注"}
            </div>
          </div>
        </div>
        {/* <div className="flex justify-between">
          <div className="text-gray-500 text-xs">{typeName}</div>
          <div className="text-gray-500 text-xs font-medium">{time}</div>
        </div>
        <div className="flex justify-between">
          <div className={`${remarks ? "text-gray-600" : "text-gray-300"}  mt-2 text-sm truncate`}>
            {remarks ? remarks : "暂无备注"}
          </div>
          <div className={`${color} mt-2 text-sm font-bold  flex-shrink-0`}>
            {type === "pay" ? "-" : "+"}￥{amounts}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CostCard;
