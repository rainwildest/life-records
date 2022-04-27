import React, { memo } from "react";
import { Progressbar, Link } from "framework7-react";
import { Icons } from "components";

type PercentageItemOptins = {
  index?: number;
  progress?: number;
  name?: string;
  icon?: string;
  amount?: number | string;
};

const PercentageItem: React.FC<PercentageItemOptins> = ({ index = 0, progress = 0, amount, name, icon }) => {
  return (
    <Link className={`shadow-active-3 flex w-full items-center rounded-lg p-2 mt-1 no-active-state`}>
      <Icons name={icon} className="shadow-3 px-2 py-2 rounded-lg flex-shrink-0 svg-icon-30" />
      <div className="w-full pl-3">
        <div className="flex text-xs justify-between px-1 mb-1">
          <div className="text-gray-600 font-semibold text-xs">
            {name} {progress || 0}%
          </div>
          <div className="flex items-center">
            <div className="font-bold leading-none">
              <span className="text-xs">￥</span>
              <span className="text-sm !mx-0">{amount || 0}</span>
            </div>
            <Icons name="arrowr" className="percentage-icon-right svg-icon-12 ml-1" />
          </div>
        </div>
        <Progressbar className="h-2" progress={progress} key={index} />
      </div>
    </Link>
  );
};

export default memo(PercentageItem);
