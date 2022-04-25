import React from "react";
import { Progressbar } from "framework7-react";
import { Icons } from "components";

type ClassificationDetailsProps = {
  name?: string;
  icon?: string;
  progress?: number;
  amount?: number | string;
};

const ClassificationDetails: React.FC<ClassificationDetailsProps> = ({ name, icon, amount, progress }) => {
  const iconClass = "shadow-3 px-2 py-2 flex-shrink-0 rounded-lg svg-icon-30";

  // shadow-active-3
  return (
    <div className="flex w-full items-center rounded-lg p-2 mt-1">
      <Icons className={iconClass} name={icon} />
      <div className="w-full pl-4">
        <div className="flex justify-between px-1 mb-1">
          <div className="text-gray-600 font-semibold text-xs">
            {name} {progress || 0}%
          </div>
          <div className="flex items-center">
            <div className="font-bold text-sm leading-none">￥{amount || 0}</div>
            {/* <Icons name="arrowr" className="percentage-icon-right svg-icon-12 ml-1" /> */}
          </div>
        </div>
        <Progressbar className="h-2" progress={progress} />
      </div>
    </div>
  );
};

export default ClassificationDetails;
