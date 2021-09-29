import React, { memo } from "react";
import { Progressbar } from "framework7-react";
import Icons from "components/Icons";

type PercentageItemOptins = {
  index?: number;
  progress?: number;
  name?: string;
  icon?: string;
};

const PercentageItem: React.FC<PercentageItemOptins> = ({
  index = 0,
  progress = 0,
  name,
  icon
}) => {
  return (
    <div
      className={`flex items-center shadow-3 rounded-lg px-4 py-3${
        index ? " mt-4" : ""
      }`}
    >
      <Icons className="px-2 flex-shrink-0" name={icon} />
      <div className="w-full">
        <div className="flex text-xs justify-between px-1">
          <div className="text-gray-600">{name}</div>
          <div className="font-bold">{progress}%</div>
        </div>
        <Progressbar className="h-2" progress={progress} key={index} />
      </div>
    </div>
  );
};

export default memo(PercentageItem);
