import React from "react";
import Icons from "components/Icons";
import { relative } from "lib/api/dayjs";

const Overdue: React.FC = () => {
  return (
    <div className="pt-2 px-6 mb-10 mt-6">
      <div className="shadow-3 rounded-lg py-3 px-4 flex justify-between">
        <div className="budget-title flex items-center flex-shrink-0 text-sm">
          <Icons name="budget" className="budget-icon pr-3" />
          <div>
            <div className="text-gray-500 text-xs">数码</div>
            <div className="truncate text-gray-600 mt-2">Macbook pro</div>
          </div>
        </div>

        <div className="rounded-lg w-auto px-3 box-border text-right overflow-hidden">
          <div className="text-gray-500 text-xs">{relative("2021-11-30")}</div>
          <div className="text-gray-600 mt-2 text-sm font-bold">1,000</div>
        </div>
      </div>
    </div>
  );
};

export default Overdue;
