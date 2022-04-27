import React from "react";
import { Progressbar } from "framework7-react";
import { Icons } from "components";

type BudgetsDetailsProps = {
  name?: string;
  icon?: string;
  progress?: number;
  original?: number | string;
  amount?: number | string;
};

const BudgetsDetails: React.FC<BudgetsDetailsProps> = ({ name, icon, amount, original, progress }) => {
  const iconClass = "shadow-3 px-2 py-2 flex-shrink-0 rounded-lg svg-icon-30";

  return (
    <div className="flex w-full items-center rounded-lg p-2 mt-1">
      <Icons className={iconClass} name={icon} />

      <div className="w-full pl-4">
        <div className="flex justify-between px-1 mb-0">
          <div className="text-gray-600 font-semibold ">
            <span className="text-xs">{name}</span>
            <span></span>
          </div>
          <div className="flex items-center">
            <div className="font-bold leading-none">
              <span className="text-sm">{progress || 0}%</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-1 mb-1">
          <div className="text-gray-600 font-semibold ">
            <span className="text-xs">已用￥{amount}</span>
          </div>
          <div className="flex items-center">
            <div className="font-bold leading-none">
              <span className="text-xs">￥</span>
              <span className="text-sm">{original || 0}</span>
            </div>
          </div>
        </div>

        <Progressbar className="h-2" color={progress > 100 ? "red" : "blue"} progress={progress > 100 ? 100 : progress} />
      </div>
    </div>
  );
};

export default BudgetsDetails;
